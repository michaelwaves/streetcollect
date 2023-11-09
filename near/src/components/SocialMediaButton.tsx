import Image from "next/image"

export default function SocialMediaButton({ platform, id }: { platform: string, id: string }) {

    const link = () => {
        switch (platform) {
            case "linkedin":
                return `https://www.linkedin.com/in/${id}`
            case "instagram":
                return `https://www.instagram.com/${id}`
            case "slack":
                return `https://join.slack.com/t/${id}`
            case "discord":
                return `https://discordapp.com/users/${id}`
            default:
                "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        }
    }
    return (

        <Image src={`/${platform}.svg`} alt={platform} width={50} height={50}
            className="rounded-xl cursor-pointer hover:scale-105 transition-all duration-100"
            onClick={() => window.open(link(), "_blank")}>
        </Image>

    )
}