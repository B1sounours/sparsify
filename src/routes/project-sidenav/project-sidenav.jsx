import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Divider, List, Typography } from "@material-ui/core";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import { find, propEq, compose, defaultTo } from "ramda";

import {
  getOptimsThunk,
  getProfilesLossThunk,
  getProfilesPerfThunk,
  getProjectThunk,
  selectProjectsState,
  selectSelectedOptimsState,
  selectSelectedProfilesLossState,
  selectSelectedProfilesPerfState,
  selectSelectedProjectState,
} from "../../store";
import { createHomePath } from "../paths";
import makeStyles from "./project-sidenav-styles";
import LoaderLayout from "../../components/loader-layout";
import ScrollerLayout from "../../components/scroller-layout";
import ProjectSideNavMenuProfilePerf from "./menu-profile-perf";
import AbsoluteLayout from "../../components/absolute-layout";
import ProjectSideNavMenuProfileLoss from "./menu-profile-loss";
import ProjectSideNavMenuBenchmark from "./menu-benchmark";
import ProjectSideNavMenuSettings from "./menu-settings";
import ProjectSideNavMenuOptim from "./menu-optim";

function ProjectSideNav({ match }) {
  const projectId = match.params.projectId;
  const action = match.params.action ? match.params.action : null;
  const actionId = match.params.actionId ? match.params.actionId : null;

  const useStyles = makeStyles();
  const classes = useStyles();

  const dispatch = useDispatch();
  const projectsState = useSelector(selectProjectsState);
  const selectedProjectState = useSelector(selectSelectedProjectState);
  const selectedProfilesPerfState = useSelector(
    selectSelectedProfilesPerfState
  );
  const selectedProfilesLossState = useSelector(
    selectSelectedProfilesLossState
  );
  const selectedOptimsState = useSelector(selectSelectedOptimsState);

  const selectedProjectMetaData = compose(
    find(propEq("project_id", projectId)),
    defaultTo({})
  )(projectsState.val);

  if (selectedProjectState.projectId !== projectId) {
    dispatch(getProjectThunk({ projectId }));
    dispatch(getProfilesPerfThunk({ projectId }));
    dispatch(getProfilesLossThunk({ projectId }));
    dispatch(getOptimsThunk({ projectId }));
  }

  const history = useHistory();

  function handleBackClick() {
    history.push(createHomePath());
  }

  return (
    <AbsoluteLayout layoutClass={classes.root}>
      <div className={classes.header}>
        <Button className={classes.headerButton} onClick={handleBackClick}>
          <ChevronLeft />
        </Button>
        <Typography color="textPrimary" className={classes.headerText} noWrap>
          {selectedProjectMetaData ? selectedProjectMetaData.name : ""}
        </Typography>
      </div>
      <Divider />
      <div className={classes.content}>
        <ScrollerLayout spacingTop={2}>
          <LoaderLayout
            error={selectedProjectState.error}
            status={selectedProjectState.status}
            errorTitle="Error loading project"
          >
            <List className={classes.list}>
              <ProjectSideNavMenuProfilePerf
                selectedState={selectedProfilesPerfState}
                projectId={projectId}
                action={action}
                profileId={action === "perf" ? actionId : null}
              />
              <ProjectSideNavMenuProfileLoss
                selectedState={selectedProfilesLossState}
                projectId={projectId}
                action={action}
                profileId={action === "loss" ? actionId : null}
              />
              <ProjectSideNavMenuOptim
                selectedOptimsState={selectedOptimsState}
                selectedProfilesPerfState={selectedProfilesPerfState}
                selectedProfilesLossState={selectedProfilesLossState}
                projectId={projectId}
                action={action}
                profileId={action === "optim" ? actionId : null}
              />
              <ProjectSideNavMenuBenchmark
                projectId={projectId}
                action={action}
              />
              <ProjectSideNavMenuSettings
                projectId={projectId}
                action={action}
              />
            </List>
          </LoaderLayout>
        </ScrollerLayout>
      </div>
    </AbsoluteLayout>
  );
}

export default ProjectSideNav;