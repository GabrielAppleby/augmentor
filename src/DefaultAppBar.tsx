import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React from "react";

interface DefaultAppBarProps {

}

export const DefaultAppBar: React.FC<DefaultAppBarProps> = () => {

    return (
        <AppBar position={"static"}>
            <Toolbar>
                <Typography variant="h6">
                    VALT - AUGMENT
                </Typography>
            </Toolbar>
        </AppBar>
    )
}