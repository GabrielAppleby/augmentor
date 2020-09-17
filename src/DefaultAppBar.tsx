import {AppBar, Toolbar, Typography} from "@material-ui/core";
import React from "react";
import {makeStyles} from "@material-ui/core/styles";

interface DefaultAppBarProps {

}

const useStyles = makeStyles({
    appBar: {},
    toolbar: {},
    heading: {}
});

export const DefaultAppBar: React.FC<DefaultAppBarProps> = () => {
    const classes = useStyles();

    return (
        <AppBar className={classes.appBar} position={"static"}>
            <Toolbar className={classes.toolbar}>
                <Typography className={classes.heading} variant="h6">
                    VALT - AUGMENT
                </Typography>
            </Toolbar>
        </AppBar>
    )
}