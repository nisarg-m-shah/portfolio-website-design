import Link from "next/link"
import { Github, Linkedin, Twitter, Mail, Youtube, MessageCircle } from "lucide-react"
import portfolioData from "@/data/portfolio.json"
import { PortfolioData } from "@/types/portfolio"

const iconMap: Record<string, React.ReactNode> = {
  github: <Github className="h-5 w-5" />,
  linkedin: <Linkedin className="h-5 w-5" />,
  twitter: <Twitter className="h-5 w-5" />,
  mail: <Mail className="h-5 w-5" />,
  youtube: <Youtube className="h-5 w-5" />,
  discord: <MessageCircle className="h-5 w-5" />,
}

export function Footer() {
  const data = portfolioData as PortfolioData
  const connectItems = data.connect
  return (
    <footer className="border-t border-border bg-background px-4 py-8 md:px-12 lg:px-16">
      <div className="mx-auto max-w-6xl">
        {/* Links grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-5 md:mb-8 md:grid-cols-3 md:gap-8">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Navigate</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="#featured" className="text-sm text-muted-foreground hover:text-foreground">
                  Featured Projects
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-sm text-muted-foreground hover:text-foreground">
                  All Projects
                </Link>
              </li>
              <li>
                <Link href="#achievements" className="text-sm text-muted-foreground hover:text-foreground">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-sm text-muted-foreground hover:text-foreground">
                  Skills
                </Link>
              </li>
              <li>
                <Link href="#connect" className="text-sm text-muted-foreground hover:text-foreground">
                  Connect
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Connect</h3>
            <ul className="space-y-1 md:space-y-2">
              {connectItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={item.url}
                    target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                    rel={item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-2 text-sm font-semibold text-foreground md:mb-4">Legal</h3>
            <ul className="space-y-1 md:space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Closing identity area */}
        <div className="mt-6 border-t border-border pt-6 md:mt-8 md:pt-8">
          <div className="flex flex-col items-center gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold text-primary">N</span>
              <span className="text-sm font-semibold text-foreground">
                Nisarg Shah
              </span>
              <span className="text-sm text-muted-foreground">· Data Scientist</span>
            </div>
            <div className="flex items-center gap-4">
              {connectItems.map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target={item.url.startsWith("mailto:") ? undefined : "_blank"}
                  rel={item.url.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="text-muted-foreground hover:text-foreground"
                >
                  {iconMap[item.icon]}
                </a>
              ))}
            </div>
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Nisarg. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}