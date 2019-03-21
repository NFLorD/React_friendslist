const Friend = ({ details, onDelete }) => (
  <li className="list-group-item">
    <img
      className="mr-2"
      style={{ width: "32px", borderRadius: "50%" }}
      src={details.avatar}
    />
    {details.name}
    <button
      onClick={() => onDelete(details.id)}
      className="float-right ml-2 btn btn-sm btn-danger"
    >
      <i className="fas fa-times" />
    </button>
  </li>
);

class FriendsList extends React.Component {
  constructor() {
    super();
    this.state = {
      friends: []
    };
  }

  componentDidMount() {
    axios
      .get("https://5c93b8f84dca5d0014ad82de.mockapi.io/friends/")
      .then(response =>
        this.setState({
          friends: response.data
        })
      );
  }

  handleDelete = id => {
    axios
      .delete("https://5c93b8f84dca5d0014ad82de.mockapi.io/friends/" + id)
      .then(() => {
        const friends = this.state.friends.filter(friend => friend.id != id);
        this.setState({
          friends: friends
        });
      });
  };

  render() {
    return (
      <ul>
        {this.state.friends.map(friend => (
          <Friend
            details={friend}
            key={friend.id}
            onDelete={id => this.handleDelete(id)}
          />
        ))}
      </ul>
    );
  }
}

ReactDOM.render(<FriendsList />, document.querySelector("#app"));
