import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useTranslations } from "@/locale/translations";
import { language } from "@/stores/language";
import { useStore } from "@nanostores/react";

interface TextProps {
  text: string,
  className?: string
}

function P ({ text, className }: TextProps) {
  const translate = useTranslations()

  if (text === "description") {
    return (
      <TextGenerateEffect words={translate("description")} />
    )
  }
  else return (
    <p className={className}>{translate(text)}</p>
  )
}
function H1 ({ text, className }: TextProps) {
  const translate = useTranslations()

  return (
    <h1 className={className}>{translate(text)}</h1>
  )
}

function H2 ({ text, className }: TextProps) {
  const translate = useTranslations()
  return (
    <h2 className={className}>{translate(text)}</h2>
  )
}

export { P, H2, H1 }