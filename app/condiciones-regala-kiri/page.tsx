import LegalPage, { legalMetadata } from "@/components/legal/legal-page"
import { GIFT_DOC } from "@/lib/legal/gift"

export const metadata = legalMetadata(GIFT_DOC)

export default function Page() {
  return <LegalPage doc={GIFT_DOC} />
}
