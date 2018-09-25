import axios from 'axios'

const api = 'https://cz-library-api.shaoyaoju.org'

export const getUserinfo = ({
  BH = null
}) => {
  return new Promise((resolve, reject) => {
    axios.get(`${api}/user/detail?bh=${BH}`)
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const updateUserinfo = ({
  CardId = null,
  BH = null,
  Name = null,
  CardNo = null,
  Sex = null,
  Department = null
}) => {
  return new Promise((resolve, reject) => {
    axios.put(`${api}/user/${CardId}`, {
      BH,
      Name,
      CardNo,
      Sex,
      Department
    })
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}

export const create = ({
  BH = null,
  Name = null,
  CardNo = null,
  Sex = null,
  Department = null
}) => {
  return new Promise((resolve, reject) => {
    axios.post(`${api}/users`, {
      BH,
      Name,
      CardNo,
      Sex,
      Department
    })
      .then(r => {
        resolve(r)
      })
      .catch(e => {
        reject(e)
      })
  })
}
