import axios from "axios";

// const baseURL = "http://simpletwitter.ddns.net/api";

// eslint-disable-next-line no-undef
const baseURL = process.env.REACT_APP_BASEURL
// admin

export const adminGetUserTweets = async ({ token }) => {
  try {
    const data = await axios.get(`${baseURL}/admin/tweets`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

export const adminDeleteUserTweet = async ({ tweetId, token }) => {
  try {
    const { status } = await axios.delete(`${baseURL}/admin/tweets/${tweetId}`, {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (status === 200) return { success: true }
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
    return data
  } catch (error) {
    console.log(error)
  }
}

