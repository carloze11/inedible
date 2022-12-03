import React from "react";

export default function AddBtn() {
    return (
        <>
            <div className="fixed-action-btn">
                <a
                    href="/foods/add"
                    className="btn-floating btn-large waves-effect waves-light red"
                >
                    <i className="fas fa-plus"></i>
                </a>
            </div>
        </>
    );
}
