import axios from "axios";

// const baseURL = "http://simpletwitter.ddns.net/api";
const baseURL = "https://divine-bush-6092.fly.dev/api";
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

    // console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

