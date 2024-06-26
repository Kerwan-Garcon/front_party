"use client";

import { CarouselProgressBar } from "@/components/carousels/CarouselProgressBar";
import { HeroHomepage } from "@/components/layout/home/hero/HeroHomePage";
import { DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { useHero } from "@/hooks/useHeroSelection";

export function HeroCheckbox() {
  const { isChecked, toggleCheckbox } = useHero();
  return (
    <DropdownMenuCheckboxItem
      checked={isChecked}
      onCheckedChange={toggleCheckbox}
      className="cursor-pointer"
    >
      Static Hero
    </DropdownMenuCheckboxItem>
  );
}

export function HerosComponent() {
  const { isChecked } = useHero();

  return <>{isChecked ? <HeroHomepage /> : <CarouselProgressBar />}</>;
}
