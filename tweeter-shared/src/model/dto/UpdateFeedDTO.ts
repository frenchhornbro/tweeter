import { StatusDTO } from "./StatusDTO";

export interface UpdateFeedDTO {
    followerAliases: string[];
    status: StatusDTO;
}