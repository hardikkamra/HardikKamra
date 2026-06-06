import { BookOpenIcon, InfoIcon, LifeBuoyIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const navigationLinks = [
  { href: "#home", label: "Home" },
  {
    label: "Work",
    submenu: true,
    type: "description",
    items: [
      {
        href: "#work",
        label: "Data Architecture",
        description: "Scalable pipelines and data infrastructure.",
      },
      {
        href: "#work",
        label: "Financial Models",
        description: "Complex forecasting and budgeting models.",
      },
      {
        href: "#work",
        label: "Dashboards",
        description: "Interactive visualization and BI tools.",
      },
    ],
  },
  {
    label: "About",
    submenu: true,
    type: "icon",
    items: [
      { href: "#skills", label: "Education", icon: "BookOpenIcon" },
      { href: "#skills", label: "My Journey", icon: "LifeBuoyIcon" },
      { href: "#contact", label: "Contact", icon: "InfoIcon" },
    ],
  },
]

export function Topbar() {
  return (
    <div className="px-4 md:px-6 relative z-50 text-white pt-4 bg-transparent">
      <div className="flex h-14 items-center justify-between gap-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden text-white hover:text-white/80"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-64 p-1 md:hidden bg-[#0c0c0c] border-white/10 text-white">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full">
                      {link.submenu ? (
                        <>
                          <div className="text-white/50 px-2 py-1.5 text-xs font-medium">
                            {link.label}
                          </div>
                          <ul>
                            {link.items.map((item, itemIndex) => (
                              <li key={itemIndex}>
                                <NavigationMenuLink
                                  href={item.href}
                                  className="py-1.5 block hover:text-white/80"
                                >
                                  {item.label}
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <NavigationMenuLink href={link.href} className="py-1.5 block hover:text-white/80">
                          {link.label}
                        </NavigationMenuLink>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          <div className="flex items-center gap-6">
            <a href="#home" className="font-bold text-xl tracking-tighter text-white hover:text-white/90">
              Cibi.
            </a>
            
            <div className="hidden md:flex justify-center flex-1">
              <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-6 py-1.5 shadow-lg">
                <NavigationMenu>
                  <NavigationMenuList className="gap-2">
                    {navigationLinks.map((link, index) => (
                      <NavigationMenuItem key={index}>
                        {link.submenu ? (
                          <>
                            <NavigationMenuTrigger className="text-white/70 hover:text-white bg-transparent px-2 py-1.5 font-medium data-[state=open]:text-white data-[state=open]:bg-white/5">
                              {link.label}
                            </NavigationMenuTrigger>
                            <NavigationMenuContent className="bg-[#0c0c0c] border-white/10 text-white">
                              <ul className={cn(
                                "grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]",
                                link.type === "description" && "md:grid-cols-1"
                              )}>
                                {link.items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <NavigationMenuLink asChild>
                                      <a
                                        href={item.href}
                                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 focus:bg-white/10"
                                      >
                                        {link.type === "icon" && "icon" in item && (
                                          <div className="flex items-center gap-2">
                                            {item.icon === "BookOpenIcon" && <BookOpenIcon size={16} className="opacity-60" />}
                                            {item.icon === "LifeBuoyIcon" && <LifeBuoyIcon size={16} className="opacity-60" />}
                                            {item.icon === "InfoIcon" && <InfoIcon size={16} className="opacity-60" />}
                                            <div className="text-sm font-medium leading-none">{item.label}</div>
                                          </div>
                                        )}
                                        {link.type === "description" && "description" in item && (
                                          <>
                                            <div className="text-sm font-medium leading-none">{item.label}</div>
                                            <p className="line-clamp-2 text-sm leading-snug text-white/50">{item.description}</p>
                                          </>
                                        )}
                                        {link.type === "simple" && (
                                          <div className="text-sm font-medium leading-none">{item.label}</div>
                                        )}
                                      </a>
                                    </NavigationMenuLink>
                                  </li>
                                ))}
                              </ul>
                            </NavigationMenuContent>
                          </>
                        ) : (
                          <NavigationMenuLink asChild>
                            <a
                              href={link.href}
                              className="text-white/70 hover:text-white py-1.5 px-2 font-medium"
                            >
                              {link.label}
                            </a>
                          </NavigationMenuLink>
                        )}
                      </NavigationMenuItem>
                    ))}
                  </NavigationMenuList>
                  <NavigationMenuViewport />
                </NavigationMenu>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="text-sm text-white/70 hover:text-white hover:bg-white/10 hidden md:inline-flex">
            <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
          </Button>
          <Button asChild size="sm" className="text-sm bg-white text-black hover:bg-white/90">
            <a href="#contact">Contact Me</a>
          </Button>
        </div>
      </div>
    </div>
  )
}
