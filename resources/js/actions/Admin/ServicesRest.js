import BasicRest from "../BasicRest";
import { Fetch, Notify } from "sode-extend-react";

class ServicesRest extends BasicRest {
    path = "admin/services";
    hasFiles = true;

    reorder = async (items) => {
        try {
            const { status: fetchStatus, result } = await Fetch(
                `/api/${this.path}/reorder`,
                {
                    method: "POST",
                    body: JSON.stringify({ items }),
                }
            );
            if (!fetchStatus)
                throw new Error(
                    result?.message ?? "An unexpected error occurred"
                );

            Notify.add({
                icon: "/assets/img/icon.png",
                title: "Success",
                body: result.message,
                type: "success",
            });

            return true;
        } catch (error) {
            Notify.add({
                icon: "/assets/img/icon.png",
                title: "Error",
                body: error.message,
                type: "danger",
            });

            return false;
        }
    };
}

export default ServicesRest;
