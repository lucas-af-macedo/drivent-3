import { getHotels, getOneHotel } from "@/controllers/hotels-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const hotelsRouter = Router();

hotelsRouter.all("/*", authenticateToken);
hotelsRouter.get("/", getHotels);
hotelsRouter.get("/:hotelId", getOneHotel);

export default hotelsRouter;
