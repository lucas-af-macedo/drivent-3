import { notFoundError, paymentRequiredError } from "@/errors";
import enrollmentRepository from "@/repositories/enrollment-repository";
import hotelsRepository from "@/repositories/hotels-repository";
import ticketRepository from "@/repositories/ticket-repository";

async function enrollmentExists(userId: number) {
  const enrollment = await enrollmentRepository.findWithAddressByUserId(userId);
  if (!enrollment) {
    throw notFoundError();
  }
  return enrollment;
}

async function verifyTicket(enrollmentId: number) {
  const ticket = await ticketRepository.findTicketByEnrollmentId(enrollmentId);
  if (!ticket) {
    throw notFoundError();
  } else if (ticket.status !== "PAID") {
    throw paymentRequiredError();
  } else if (ticket.TicketType.isRemote) {
    throw paymentRequiredError();
  } else if (!ticket.TicketType.includesHotel) {
    throw paymentRequiredError();
  }
}

async function getHotels() {
  const hotels = await hotelsRepository.getMany();
  if (!hotels.length) {
    throw notFoundError();
  }
  return hotels;
}

async function getOneHotel(hotelId: number) {
  const hotel = await hotelsRepository.getOne(hotelId);
  if (!hotel) {
    throw notFoundError();
  }
  return hotel;
}

const hotelsService = {
  getHotels,
  getOneHotel,
  enrollmentExists,
  verifyTicket,
};

export default hotelsService;
