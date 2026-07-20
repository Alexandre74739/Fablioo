"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME_LENGTH = 80;
const MAX_TEL_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 5000;
const MIN_SUBMIT_DELAY_MS = 3000;
const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = new Set([
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

export interface ContactFormState {
  success: boolean;
  message: string;
}

const genericSuccess: ContactFormState = {
  success: true,
  message: "Votre message a bien été envoyé, merci !",
};

// Retire tout retour à la ligne pour empêcher l'injection d'en-têtes e-mail
// (ex : un "nom" contenant "\nBcc: attaquant@mail.com").
function sanitizeLine(value: string, maxLength: number) {
  return value
    .replace(/[\r\n]+/g, " ")
    .trim()
    .slice(0, maxLength);
}

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Piège à robots : champ invisible pour les humains, rempli automatiquement par les bots de spam.
  const website = formData.get("website");
  if (typeof website === "string" && website !== "") {
    return genericSuccess;
  }

  // Rejette les envois trop rapides pour être humains (bots qui remplissent et soumettent instantanément).
  const startedAt = Number(formData.get("startedAt"));
  if (!startedAt || Date.now() - startedAt < MIN_SUBMIT_DELAY_MS) {
    return genericSuccess;
  }

  const prenomRaw = formData.get("prenom");
  const nomRaw = formData.get("nom");
  const emailRaw = formData.get("email");
  const telRaw = formData.get("tel");
  const messageRaw = formData.get("message");
  const consent = formData.get("consent");

  if (
    typeof prenomRaw !== "string" ||
    !prenomRaw.trim() ||
    typeof nomRaw !== "string" ||
    !nomRaw.trim() ||
    typeof emailRaw !== "string" ||
    !emailRaw.trim() ||
    typeof messageRaw !== "string" ||
    !messageRaw.trim()
  ) {
    return {
      success: false,
      message: "Merci de remplir tous les champs obligatoires.",
    };
  }

  const email = emailRaw.trim().slice(0, MAX_NAME_LENGTH);
  if (!EMAIL_REGEX.test(email)) {
    return {
      success: false,
      message: "L'adresse e-mail saisie n'est pas valide.",
    };
  }

  if (consent !== "on") {
    return {
      success: false,
      message:
        "Merci d'accepter la politique de confidentialité pour envoyer votre message.",
    };
  }

  const prenom = sanitizeLine(prenomRaw, MAX_NAME_LENGTH);
  const nom = sanitizeLine(nomRaw, MAX_NAME_LENGTH);
  const tel =
    typeof telRaw === "string" && telRaw.trim()
      ? sanitizeLine(telRaw, MAX_TEL_LENGTH)
      : "non renseigné";
  const message = messageRaw.trim().slice(0, MAX_MESSAGE_LENGTH);

  const files = formData
    .getAll("files")
    .filter((file): file is File => file instanceof File && file.size > 0);

  if (files.length > MAX_FILES) {
    return {
      success: false,
      message: `Vous pouvez joindre ${MAX_FILES} fichiers maximum.`,
    };
  }

  for (const file of files) {
    if (!ALLOWED_FILE_TYPES.has(file.type)) {
      return {
        success: false,
        message: `Le fichier "${file.name}" n'est pas d'un type autorisé (image, PDF, Word ou texte).`,
      };
    }
    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `Le fichier "${file.name}" dépasse la taille maximale de 5 Mo.`,
      };
    }
  }

  const attachments = await Promise.all(
    files.map(async (file) => ({
      filename: file.name.replace(/[^\w.\-() ]/g, "_"),
      content: Buffer.from(await file.arrayBuffer()),
    })),
  );

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL ?? "Fablioo <onboarding@resend.dev>",
    to: process.env.RESEND_TO_EMAIL ?? "perezalexandre430@gmail.com",
    replyTo: email,
    subject: `Nouveau message de ${prenom} ${nom}`,
    text: `${prenom} ${nom}\nEmail : ${email}\nTéléphone : ${tel}\n\n${message}`,
    attachments: attachments.length ? attachments : undefined,
  });

  if (error) {
    return {
      success: false,
      message: "Une erreur est survenue, merci de réessayer plus tard.",
    };
  }

  return genericSuccess;
}
