"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  Mail,
  Paperclip,
  Phone,
} from "lucide-react";
import {
  sendContactMessage,
  type ContactFormState,
} from "@/app/contact/actions";
import Reveal from "@/_components/animations/Reveal";
import FloatingBlob from "@/_components/animations/FloatingBlob";
import Button from "@/_components/ui/Button";
import Input from "@/_components/ui/Input";
import GithubIcon from "@/_components/icons/GithubIcon";
import LinkedinIcon from "@/_components/icons/LinkedinIcon";

const initialState: ContactFormState = { success: false, message: "" };

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      content={pending ? "Envoi en cours..." : "Envoyer le message"}
      style="primary"
    />
  );
}

export default function ContactForm() {
  const [state, formAction] = useActionState(sendContactMessage, initialState);
  const [fileNames, setFileNames] = useState<string[]>([]);
  const [wasSuccess, setWasSuccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const startedAtRef = useRef<HTMLInputElement>(null);

  if (state.success !== wasSuccess) {
    setWasSuccess(state.success);
    if (state.success) setFileNames([]);
  }

  // Horodatage rempli côté client uniquement : sert à rejeter côté serveur les
  // envois trop rapides pour être humains, sans jamais être présent au premier rendu SSR.
  useEffect(() => {
    if (startedAtRef.current) startedAtRef.current.value = String(Date.now());
  }, [state]);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  return (
    <section className="relative overflow-hidden bg-paper px-4 pt-32 pb-16 md:px-8 md:pt-40 md:pb-24">
      <FloatingBlob
        src="/shapes/blob-2.svg"
        className="-left-24 top-0 h-48 w-48 md:h-64 md:w-64"
        duration={9}
        yRange={16}
        rotateRange={5}
      />
      <FloatingBlob
        src="/shapes/blob-1.svg"
        className="-right-20 top-1/3 h-56 w-56 md:h-72 md:w-72"
        duration={8}
        delay={0.5}
        yRange={-14}
        rotateRange={-4}
      />
      <FloatingBlob
        src="/shapes/blob-3.svg"
        className="hidden -left-36 bottom-0 h-64 w-64 sm:block md:h-96 md:w-96"
        duration={8.5}
        delay={1}
        yRange={14}
        rotateRange={5}
      />

      <div className="container relative z-10 mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:items-start lg:gap-16">
          <Reveal className="lg:col-span-2">
            <div className="flex flex-col gap-6">
              <h1 className="text-4xl font-bold text-encre md:text-5xl">
                Racontons{" "}
                <span className="font-quote font-semibold italic text-rosewood">
                  votre histoire
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-encre/80">
                Parlez-moi de votre projet, de vos envies et de vos délais.
                J'étudie chaque demande avec attention pour vous proposer un
                accompagnement sur mesure.
              </p>

              <ul className="flex flex-col gap-3 border-t border-encre/10 pt-6">
                <li>
                  <a
                    href="https://github.com/Alexandre74739"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline flex w-fit items-center gap-3 text-encre/80 hover:text-rosewood"
                  >
                    <GithubIcon className="h-5 w-5 shrink-0 text-rosewood" />
                    github.com/Alexandre74739
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/alexandre74739"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-underline flex w-fit items-center gap-3 text-encre/80 hover:text-rosewood"
                  >
                    <LinkedinIcon className="h-5 w-5 shrink-0 text-rosewood" />
                    linkedin.com/in/alexandre74739
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.2} className="lg:col-span-3">
            <form
              ref={formRef}
              action={formAction}
              className="flex flex-col gap-6 rounded-3xl border border-encre/10 bg-paper p-6 shadow-xl md:p-10"
            >
              <input ref={startedAtRef} type="hidden" name="startedAt" />
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="sr-only"
              />

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Input
                  id="prenom"
                  name="prenom"
                  label="Prénom"
                  autoComplete="given-name"
                  placeholder="Jean"
                  required
                />
                <Input
                  id="nom"
                  name="nom"
                  label="Nom"
                  autoComplete="family-name"
                  placeholder="Dupont"
                  required
                />
              </div>

              <Input
                id="email"
                name="email"
                label="E-mail"
                type="email"
                autoComplete="email"
                placeholder="vous@exemple.com"
                required
                icon={Mail}
              />

              <Input
                id="tel"
                name="tel"
                label="Téléphone"
                type="tel"
                autoComplete="tel"
                placeholder="06 12 34 56 78"
                icon={Phone}
              />

              <Input
                id="message"
                name="message"
                label="Message"
                rows={6}
                required
                placeholder="Décrivez-moi votre projet, vos envies, vos délais..."
              />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="files"
                  className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-encre/25 bg-sand/20 px-4 py-4 transition-colors duration-200 hover:border-rosewood hover:bg-sand/30"
                >
                  <Paperclip className="h-5 w-5 shrink-0 text-rosewood" />
                  <span className="text-sm text-encre/70">
                    <span className="font-semibold text-encre">
                      Ajouter des pièces jointes
                    </span>{" "}
                    <span className="text-encre/50">
                      (facultatif, 5 Mo max par fichier)
                    </span>
                  </span>
                </label>
                <input
                  id="files"
                  name="files"
                  type="file"
                  multiple
                  accept="image/png,image/jpeg,image/webp,image/gif,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  className="sr-only"
                  onChange={(event) =>
                    setFileNames(
                      Array.from(event.target.files ?? []).map(
                        (file) => file.name,
                      ),
                    )
                  }
                />
                {fileNames.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {fileNames.map((name) => (
                      <li
                        key={name}
                        className="rounded-full bg-sand/50 px-3 py-1 text-xs text-encre/70"
                      >
                        {name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label className="flex items-start gap-3 text-sm text-encre/70">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-encre/30 accent-rosewood focus:ring-2 focus:ring-rosewood/30"
                />
                <span>
                  J'accepte que mes données soient utilisées pour traiter ma
                  demande, conformément à la{" "}
                  <Link
                    href="/confidentialite"
                    className="link-underline text-rosewood"
                  >
                    politique de confidentialité
                  </Link>
                  . Elles ne sont jamais transmises à des tiers.
                </span>
              </label>

              {state.message && (
                <div
                  role="status"
                  className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm ${
                    state.success
                      ? "bg-prune/10 text-prune"
                      : "bg-rosewood/10 text-rosewood"
                  }`}
                >
                  {state.success ? (
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                  ) : (
                    <AlertCircle className="h-4 w-4 shrink-0" />
                  )}
                  {state.message}
                </div>
              )}

              <SubmitButton />
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
