import { DBProvider, Toy } from "./interface";

// Initial mock data from toysData.js to fall back on for the local provider
let mockToys: Toy[] = [
  {
    id: "toy-1",
    title: "LEGO Duplo Deluxe Steam Train Set",
    category: "STEM & Science",
    age: "Age 3-5 Yrs",
    societyName: "Celestial City, Ravet",
    ownerName: "Priya Sharma",
    pts: 120,
    condition: "Like New",
    image: "https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=800&q=80",
    views: 142,
    createdAt: new Date().toISOString(),
  },
  {
    id: "toy-2",
    title: "Hot Wheels Ultimate Garage",
    category: "Action & Vehicles",
    age: "Age 6-8 Yrs",
    societyName: "Urban Skyline, Ravet",
    ownerName: "Neha Verma",
    pts: 150,
    condition: "Gently Used",
    image: "https://images.unsplash.com/photo-1581557991964-125469da3b8a?auto=format&fit=crop&w=800&q=80",
    views: 230,
    createdAt: new Date().toISOString(),
  }
];

export class LocalProvider implements DBProvider {
  async getAllToys(): Promise<Toy[]> {
    return [...mockToys];
  }

  async addToy(toy: Omit<Toy, "id" | "createdAt">): Promise<Toy> {
    const newToy: Toy = {
      ...toy,
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
    };
    mockToys = [newToy, ...mockToys];
    return newToy;
  }
}
