"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateUpdateEvent,
  EventType,
} from "@/utils/interfaces/events.interfaces";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";

export function PartysForm() {
  const [form, setForm] = useState<CreateUpdateEvent>({
    name: "",
    type: EventType.PARTY,
    date: new Date("2024-07-01"),
    time: new Date("2024-07-01T19:00:00Z"),
    remainingSpots: 0,
    description: "",
    isPaid: true,
    price: 0,
    bringDrinks: false,
    bringGames: false,
    bringEquipment: false,
    equipmentDetails: "",
    drinksDetails: "",
    organizerId: 1,
    games: [],
    location: {
      address: "",
      city: "",
      zipCode: "",
      region: "",
      country: "",
    },
  });

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (name.includes("location.")) {
      const locationField = name.split(".")[1];
      setForm((prevForm) => ({
        ...prevForm,
        location: {
          ...prevForm.location,
          [locationField]: value,
        },
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(form); // Replace this with your form submission logic
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] overflow-y-auto max-h-[750px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Event Name
          </Label>
          <Input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Event Type
          </Label>
          <Input
            type="text"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Event Date
          </Label>
          <Input
            type="date"
            name="date"
            value={form.date.toISOString().slice(0, 10)}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Event Time
          </Label>
          <Input
            type="time"
            name="time"
            value={form.time.toISOString().slice(11, 16)}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="remainingSpots"
            className="block text-sm font-medium text-gray-700"
          >
            Remaining Spots
          </Label>
          <Input
            type="number"
            name="remainingSpots"
            value={form.remainingSpots}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </Label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Is Paid
          </Label>
          <Checkbox
            name="isPaid"
            checked={form.isPaid}
            onCheckedChange={(e: boolean) => {
              setForm((prevForm) => ({
                ...prevForm,
                isPaid: e,
              }));
            }}
            className="mt-1"
          />
        </div>

        <div>
          <Label
            htmlFor="price"
            className="block text-sm font-medium text-gray-700"
          >
            Price
          </Label>
          <Input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
            step="0.01"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Bring Drinks
          </Label>
          <Checkbox
            name="bringDrinks"
            checked={form.bringDrinks}
            onCheckedChange={(e: boolean) => {
              setForm((prevForm) => ({
                ...prevForm,
                bringDrinks: e,
              }));
            }}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Bring Games
          </Label>
          <Checkbox
            name="bringGames"
            checked={form.bringGames}
            onCheckedChange={(e: boolean) => {
              setForm((prevForm) => ({
                ...prevForm,
                bringGames: e,
              }));
            }}
            className="mt-1"
          />
        </div>

        <div>
          <Label className="block text-sm font-medium text-gray-700">
            Bring Equipment
          </Label>
          <Checkbox
            name="bringEquipment"
            checked={form.bringEquipment}
            onCheckedChange={(e: boolean) => {
              setForm((prevForm) => ({
                ...prevForm,
                bringEquipment: e,
              }));
            }}
            className="mt-1"
          />
        </div>

        <div className={form.bringEquipment ? "" : "hidden"}>
          <Label
            htmlFor="equipmentDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Equipment Details
          </Label>
          <Textarea
            name="equipmentDetails"
            value={form.equipmentDetails}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="drinksDetails"
            className="block text-sm font-medium text-gray-700"
          >
            Drinks Details
          </Label>
          <Textarea
            name="drinksDetails"
            value={form.drinksDetails}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="location.address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </Label>
          <Input
            type="text"
            name="location.address"
            value={form.location.address}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="location.city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </Label>
          <Input
            type="text"
            name="location.city"
            value={form.location.city}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="location.zipCode"
            className="block text-sm font-medium text-gray-700"
          >
            Zip Code
          </Label>
          <Input
            type="text"
            name="location.zipCode"
            value={form.location.zipCode}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="location.region"
            className="block text-sm font-medium text-gray-700"
          >
            Region
          </Label>
          <Input
            type="text"
            name="location.region"
            value={form.location.region}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div>
          <Label
            htmlFor="location.country"
            className="block text-sm font-medium text-gray-700"
          >
            Country
          </Label>
          <Input
            type="text"
            name="location.country"
            value={form.location.country}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
