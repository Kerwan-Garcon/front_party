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
  Event,
  EventType,
} from "@/utils/interfaces/events.interfaces";
import { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { useCookies } from "next-client-cookies";
import { jwtDecode } from "jwt-decode";
import { Icons } from "../Icon";
import { useEvents } from "@/hooks/api/useEvents";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export function PartysForm({ event }: { event?: Event }) {
  const { get } = useCookies();

  const user = jwtDecode(get("token") ?? "").sub;

  const [form, setForm] = useState<CreateUpdateEvent>({
    name: event?.name || "",
    type: event?.type || EventType.PARTY,
    date: new Date(event?.date || "2024-07-01"),
    time: new Date(event?.time || "2024-07-01T19:00:00Z"),
    remainingSpots: event?.remainingSpots || 0,
    description: event?.description || "",
    isPaid: event?.isPaid || false,
    price: event?.price || 0,
    bringDrinks: event?.bringDrinks || false,
    bringGames: event?.bringGames || false,
    bringEquipment: event?.bringEquipment || false,
    equipmentDetails: event?.equipmentDetails || "",
    drinksDetails: event?.drinksDetails || "",
    organizerId: event?.organizerId || parseInt(user ?? ""),
    games: event?.games || [],
    location: event?.location || {
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

  const { addEvent, updateEvent } = useEvents();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    {
      event
        ? await updateEvent({ eventId: event.id, event: form })
        : await addEvent(form);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" className="flex  gap-4">
          <Icons.plus className="h-3.5 w-3.5" />
          {event ? "Edit" : "Add"} party
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-[625px] overflow-y-auto max-h-[750px]">
        <DialogHeader>
          <DialogTitle> {event ? "Edit" : "Add"} party</DialogTitle>
          <DialogDescription>
            {event ? "Edit your party here" : "Add an event here"}. Click save
            when you&apos;re done.
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

          <Select
            onValueChange={(value: EventType) =>
              setForm((prevForm) => ({ ...prevForm, type: value }))
            }
            defaultValue={form.type}
          >
            <SelectTrigger className="">
              <SelectValue placeholder="Select " />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Party type</SelectLabel>
                <SelectItem value={EventType.PARTY}>PARTY</SelectItem>
                <SelectItem value={EventType.VIDEO_GAME}>VIDEO GAME</SelectItem>
                <SelectItem value={EventType.BOARD_GAME}>BOARD GAME</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
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
            value={form.date.toISOString().slice(0, 10) || ""}
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
            value={form.time.toISOString().slice(11, 16) || ""}
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
          <div className={form.isPaid ? "" : "hidden"}>
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
          <div className={form.bringDrinks ? "" : "hidden"}>
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
        {form.type !== EventType.PARTY && (
          <div>
            <Label
              htmlFor="games"
              className="block text-sm font-medium text-gray-700"
            >
              Games
            </Label>
            {form.games.map((game, index) => (
              <Input
                key={index}
                placeholder="Game name"
                type="text"
                name="games"
                value={game.name}
                onChange={(e) => {
                  const newGames = [...form.games];
                  newGames[index] = { name: e.target.value };
                  setForm((prevForm) => ({
                    ...prevForm,
                    games: newGames,
                  }));
                }}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
              />
            ))}
            <Button
              className="mt-4"
              onClick={() =>
                setForm((prevForm) => ({
                  ...prevForm,
                  games: [...prevForm.games, { name: "" }],
                }))
              }
            >
              Add game
            </Button>
          </div>
        )}
        <DialogFooter>
          <Button onClick={(e) => handleSubmit(e)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
