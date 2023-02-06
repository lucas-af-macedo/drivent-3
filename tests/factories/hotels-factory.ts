import faker from "@faker-js/faker";
import { prisma } from "@/config";

export async function createHotel() {
  return prisma.hotel.create({
    data: {
      name: faker.name.findName(),
      image: faker.image.imageUrl(),
      Rooms: {
        create: {
          name: faker.name.findName(),
          capacity: faker.datatype.number(),
        },
      },
    },
    include: {
      Rooms: true,
    },
  });
}
