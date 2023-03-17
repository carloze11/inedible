import { useAuthContext } from "../hooks/useAuthContext";

export default function Dashboard(props) {
    const user = useAuthContext();
    const userProps = user.user;

    return (
        <div className="container">
            <h1 className="center">Dashboard</h1>
            <h3> Welcome {userProps.email}! </h3>
            <h4>Added Food List</h4>

            {props.foods ? (
                <table className="striped">
                    <thead>
                        <tr>
                            <th>Food</th>
                            <th>Category</th>
                            <th>Ingredients</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.foods.map((food) => {
                            return (
                                <tr key={food._id}>
                                    <td>
                                        <a href={`/foods/${food._id}`}>
                                            {food.foodName}
                                        </a>
                                    </td>
                                    <td>
                                        <span className="dash-status">
                                            {food.foodCategory}
                                        </span>
                                    </td>
                                    <td>
                                        <span className="dash-status">
                                            {food.ingredients.toUpperCase()}
                                        </span>
                                    </td>
                                    <td>
                                        <a
                                            href={`/foods/edit/${food._id}`}
                                            className="btn btn-float"
                                        >
                                            <i className="fas fa-edit"></i>
                                        </a>

                                        <form
                                            action={`/foods/${food._id}`}
                                            method="POST"
                                            id="delete-form"
                                        >
                                            <input
                                                type="hidden"
                                                name="_method"
                                                value="DELETE"
                                            />
                                            <button
                                                type="submit"
                                                className="btn red"
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </form>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            ) : (
                <div className="card ">You got no food!</div>
            )}
        </div>
    );
}
