function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, { 
            value: value, 
            enumerable: true, 
            configurable: true, 
            writable: true 
        });
    } 
    else {
        obj[key] = value;}return obj;
    }
    class App extends React.Component {
        constructor(...args) {super(...args);
        _defineProperty(this, "state",{isLoading: true, cities: [],  error: null });}


        fetchCities() {
            fetch(`http://localhost:3000/fetchCitiesList`).
            then(response => response.json()).
            then((data) =>
            this.setState({
            cities: data,
            isLoading: false })).


            catch(error => this.setState({ error, isLoading: false }));
        }

        componentDidMount() {
            this.fetchCities();
        }
        render() {
            const { isLoading, cities, error } = this.state;
            return (
            React.createElement(React.Fragment, null,
            React.createElement("h4", null, "Cities List"),
            error ? React.createElement("p", null, error.message) : null,
            !isLoading ?
            cities.map(city => {
                const { id, name, state } = city;
                return (
                React.createElement("div", { key: id },
                React.createElement("p", null, "Name: ", name),
                React.createElement("p", null, "State: ", state),
                React.createElement("hr", null)));


            }) :

            React.createElement("h3", null, "Loading...")));



        }
    }



ReactDOM.render(React.createElement(App, null), document.getElementById("root"));