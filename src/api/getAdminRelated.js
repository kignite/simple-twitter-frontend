import axios from "axios";

const baseURL = "https://calm-basin-50282.herokuapp.com/api";

// admin

export const adminGetUserTweets = async ({ token }) => {
  try {
    const data = await axios.get(`${baseURL}/admin/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

export const adminDeleteUserTweet = async ({ tweetId, token }) => {
  try {
    const data = await axios.delete(`${baseURL}/admin/tweets/${tweetId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (data) {
      // console.log(data)
    }
  } catch (error) {
    console.log(error)
  }
}

export const adminGetUsersData = async ({ token }) => {
  try {
    const data = await axios.get(`${baseURL}/admin/users`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}
