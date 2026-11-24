"use client";

import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/navbar";
import { HeroHybrid } from "@/components/sections/hero-hybrid";
import { FilterBar } from "@/components/sections/filter-bar";
import { ShowroomGrid } from "@/components/sections/showroom-grid";
import { PrivateLounge } from "@/components/sections/private-lounge";
import { PersonalSourcing } from "@/components/sections/personal-sourcing";
import { Footer } from "@/components/layout/footer";
import { ConciergeButton } from "@/components/layout/concierge-button";
import { VehicleDetailModal } from "@/components/modals/vehicle-detail-modal";
import { INVENTORY_VEHICLES, SHOWCASE_VEHICLES, Vehicle } from "@/data/inventory";

export default function HomePage() {
  const [selectedVehicleForModal, setSelectedVehicleForModal] = useState<Vehicle | null>(null);
  const [currentVehicleForConcierge, setCurrentVehicleForConcierge] = useState<Vehicle>(SHOWCASE_VEHICLES[0]);

  const [selectedCategory, setSelectedCategory] = useState<string>("TODOS");
  const [selectedBrand, setSelectedBrand] = useState<string>("TODAS AS MARCAS");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const filteredVehicles = useMemo(() => {
    return INVENTORY_VEHICLES.filter((vehicle) => {
      if (selectedCategory !== "TODOS") {
        if (selectedCategory === "TURBO") {
          const hasTurbo =
            vehicle.model.toLowerCase().includes("turbo") ||
            vehicle.version.toLowerCase().includes("turbo") ||
            vehicle.power.toLowerCase().includes("turbo");
          if (!hasTurbo) return false;
        } else if (vehicle.category.toLowerCase() !== selectedCategory.toLowerCase()) {
          return false;
        }
      }

      if (selectedBrand !== "TODAS AS MARCAS") {
        if (vehicle.brand.toLowerCase() !== selectedBrand.toLowerCase()) return false;
      }

      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        const matchesBrand = vehicle.brand.toLowerCase().includes(query);
        const matchesModel = vehicle.model.toLowerCase().includes(query);
        const matchesVersion = vehicle.version.toLowerCase().includes(query);
        const matchesYear = vehicle.year.toLowerCase().includes(query);
        if (!matchesBrand && !matchesModel && !matchesVersion && !matchesYear) {
          return false;
        }
      }

      return true;
    });
  }, [selectedCategory, selectedBrand, searchTerm]);

  return (
    <main className="relative min-h-screen bg-white text-neutral-900 dark:bg-[#09090B] dark:text-white transition-colors duration-500 overflow-hidden">
      <div className="intro-hide transition-opacity duration-700">
        <Navbar visible={true} />
      </div>

      <HeroHybrid
        onOpenVehicleDetail={(vehicle) => setSelectedVehicleForModal(vehicle)}
        onVehicleChange={(vehicle) => setCurrentVehicleForConcierge(vehicle)}
      />

      <div className="intro-hide transition-opacity duration-700">
        <FilterBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          selectedBrand={selectedBrand}
          onSelectBrand={setSelectedBrand}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          totalResults={filteredVehicles.length}
        />

        <ShowroomGrid
          vehicles={filteredVehicles.slice(0, 9)}
          totalAvailable={filteredVehicles.length}
          onOpenVehicleDetail={(vehicle) => setSelectedVehicleForModal(vehicle)}
        />

        <PrivateLounge />

        <PersonalSourcing />

        <Footer />

        <ConciergeButton currentVehicleName={currentVehicleForConcierge?.model} />
      </div>

      <VehicleDetailModal
        vehicle={selectedVehicleForModal}
        onClose={() => setSelectedVehicleForModal(null)}
      />
    </main>
  );
}
