import { AuthenticatedRequest } from "@/middlewares";
import hotelsService from "@/services/hotels-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getHotels(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId) as number;
  try {
    const enrollment = await hotelsService.enrollmentExists(userId);
    await hotelsService.verifyTicket(enrollment.id);

    const hotels = await hotelsService.getHotels();
    res.status(200).send(hotels);
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "PaymentRequiredError") {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}

export async function getOneHotel(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId) as number;
  const hotelId = Number(req.params.hotelId) as number;

  try {
    const enrollment = await hotelsService.enrollmentExists(userId);
    await hotelsService.verifyTicket(enrollment.id);

    const rooms = await hotelsService.getOneHotel(hotelId);
    res.status(200).send(rooms);
  } catch (error) {
    if (error.name === "NotFoundError") {
      res.sendStatus(httpStatus.NOT_FOUND);
    } else if (error.name === "PaymentRequiredError") {
      res.sendStatus(httpStatus.PAYMENT_REQUIRED);
    }
  }
}
