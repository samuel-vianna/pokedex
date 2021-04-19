// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

// export default (req, res) => {
//   res.status(200).json({ name: 'John Doe' })
// }

export const Send = async (request) => {

  const { status, data } = await axios.request(request)

  return { status, data }

}