import LegalPage, { legalMetadata } from "@/components/legal/legal-page"
import { PRIVACY_DOC } from "@/lib/legal/privacy"

export const metadata = legalMetadata(PRIVACY_DOC)

export default function Page() {
  return <LegalPage doc={PRIVACY_DOC} />
}
