import { useSession } from "next-auth/react";

export default function Test() {
    const { data: session } = useSession()

    return <div>
        {JSON.stringify(session)}
    </div>
}