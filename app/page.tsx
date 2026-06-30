import Landing from "@/components/Landing";
import { LanguageProvider } from "@/components/i18n";

export default function Home() {
  return (
    <LanguageProvider>
      <Landing />
    </LanguageProvider>
  );
}
