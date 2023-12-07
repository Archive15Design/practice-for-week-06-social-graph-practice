// Implement the SocialNetwork class here
class SocialNetwork {

  constructor() {
    this.users = {};
    this.follows = {};
    this.currentID = 0;
  }

  addUser(name) {
    this.currentID++;
    let user = {
      id: this.currentID,
      name: name,
    }
    this.users[this.currentID] = user;
    this.follows[this.currentID] = new Set();

    return user.id;
  }

  getUser(userID) {
    return this.users[userID] || null;
  }

  follow(userID1, userID2) {

    if (!this.users[userID1] || !this.users[userID2]) return false;

    let follows = this.follows[userID1];
    if (follows.has(userID2) || !follows) return false;
    else {
      follows.add(userID2);
      return true;
    }
  }

  getFollows(userID) {
    return this.follows[userID];
  }

  getFollowers(userID) {
    let followers = new Set();
    for (const user in this.follows) {
      let userFollowers = this.follows[user];
      if (userFollowers.has(userID)) followers.add(Number(user));
    }
    return followers;
  }

  getRecommendedFollows(userID, degrees) {
    let recommended = [];
    let queue = [];
    let visited = new Set();
    queue.push([userID]);

    while (queue.length > 0) {
      let path = queue.shift();
      let currentNode = path[path.length - 1];

      if (!visited.has(currentNode)) {
        visited.add(currentNode)
      } else continue;

      if (path.length > 1 && path.length <= degrees + 2 && !this.getFollows(userID).has(currentNode)) {
        recommended.push(currentNode)
      }

      let neighbours = this.getFollows(currentNode);
      for (const user of neighbours) {
        let newPath = path.concat(user);
        queue.push(newPath);
      }
    }


    return recommended;
  }
}

module.exports = SocialNetwork;
