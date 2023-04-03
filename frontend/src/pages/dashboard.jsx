import { useAuthContext } from "../hooks/useAuthContext";
import { useSpoonacular } from "../hooks/useSpoonacular";
import { useFavoriteProducts } from "../hooks/useFavoriteProducts";

import Addbtn from "../components/Addbtn";
import { useEffect } from "react";

export default function Dashboard(props) {
    const user = useAuthContext();
    const userProps = user.user;
    const { getFavoriteProducts, favoriteProducts, isLoading } =
        useFavoriteProducts();

    useEffect(() => {
        getFavoriteProducts();
    }, []);

    const renderFavorites = () => {
        return !isLoading && favoriteProducts ? (
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
                    {favoriteProducts.map((product) => {
                        return (
                            <tr key={product.productId}>
                                <td>
                                    <a href={`/foods/`}>
                                        {product.productName}
                                    </a>
                                </td>
                                <td>
                                    <span className="dash-status">
                                        {product.productDescription}
                                    </span>
                                </td>
                                <td>
                                    <a
                                        href={`/foods/edit/`}
                                        className="btn btn-float"
                                    >
                                        <i className="fas fa-edit"></i>
                                    </a>

                                    <form
                                        action={`/foods/`}
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
        );
    };

    return (
        <div className="container">
            <h1 className="center">Dashboard</h1>
            <h4>Saved Products</h4>
            {renderFavorites()}
        </div>
    );
}
