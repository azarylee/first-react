import axios from 'axios'
import * as RecordsAPI from '../utils/RecordsAPI'

export const getAll = () => axios.get(`${RecordsAPI.api}/api/v1/records`)
export const create = (body) => axios.post(`${RecordsAPI.api}/api/v1/records`,body)
export const update = (id, body) => axios.put(`${RecordsAPI.api}/api/v1/records/${id}`, body)
export const remove = (id) => axios.delete(`${RecordsAPI.api}/api/v1/records/${id}`)