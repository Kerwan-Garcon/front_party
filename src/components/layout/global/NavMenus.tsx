import { Icons } from "@/components/Icon";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ModeToggle from "@/components/theme/ToggleTheme";
import { HeroCheckbox } from "@/components/layout/home/hero/HeroSwitcher";

export function NavMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-11 px-0 cursor-pointer data-[state=open]:bg-background "
        >
          <Icons.menu className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        {/* <HeroCheckbox /> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
