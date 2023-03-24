import { useSpoonacular } from "../hooks/useSpoonacular";

export default function ProductInfo({ title, image, description }) {
    return (
        <div>
            <div className="row">
                <div className="col s12 m8">
                    <h3>{title}</h3>
                    <div>
                        <img src={image} alt="" />
                    </div>
                    <div className="card story">
                        <div className="card-content">
                            {/* <span className="card-title"> {{formatDate date ' MMMM Do YYYY, h:mm:ss a'}} </span>  */}
                            {description}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
