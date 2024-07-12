import { NextApiRequest, NextApiResponse } from "next";


type ResponseData = {
    message: string
  }

export default function handler({req, res} : {req: NextApiRequest, res: NextApiResponse<ResponseData>}) {
  
}
