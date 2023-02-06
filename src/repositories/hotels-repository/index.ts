import { prisma } from "@/config";

async function getMany() {
  return await prisma.hotel.findMany();
}

async function getOne(hotelId: number) {
  return await prisma.hotel.findFirst({
    where: { id: hotelId },
    include: {
      Rooms: true,
    },
  });
}

const hotelsRepository = {
  getMany,
  getOne,
};

export default hotelsRepository;
