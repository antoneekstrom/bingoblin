import { useRouter } from "next/dist/client/router"
import { useState } from "react"

export default function useBingoCode(initialCode: string) {
   const query = useRouter().query as { id?: string }
   return useState<string>(query.id ?? initialCode)
}
