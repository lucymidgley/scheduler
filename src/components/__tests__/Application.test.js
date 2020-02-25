import React from "react";
import axios from "axios";

import { render, cleanup, waitForElement, fireEvent, getByText, getAllByTestId, getByAltText, getByPlaceholderText, waitForElementToBeRemoved, queryByText} from "@testing-library/react";

import Application from "components/Application";


afterEach(cleanup);

describe("Application", () => {
  // it("changes the schedule when a new day is selected", () => {
  //   const { getByText } = render(<Application />);

  //   return waitForElement(() => getByText("Monday")).then(() => {
  //     fireEvent.click(getByText("Tuesday"));

  //     expect(getByText("Leopold Silvers")).toBeInTheDocument();
  //   });
  // });

  it("changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);
  
    await waitForElement(() => getByText("Monday"));
  
    fireEvent.click(getByText("Tuesday"));
  
    expect(getByText("Leopold Silvers")).toBeInTheDocument();
  });
  
  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {
    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointments = getAllByTestId(container, "appointment");
    const appointment = appointments[0];
    fireEvent.click(getByAltText(appointment, "Add"));
    fireEvent.change(getByPlaceholderText(appointment,  /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "no spots remaining")).toBeInTheDocument();
    
    
  });

  it("loads data, cancels an interview and increases the spots remaining for Monday by 1", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Delete"));
    // 3. Click the "Delete" button for Archie Cohen.
    expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
    fireEvent.click(getByText(appointment, "Confirm"));
    // 4. Click the confirm buttom.
    expect(getByText(appointment, "Deleting")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "2 spots remaining")).toBeInTheDocument();
    // 5. Check that the element deleting is displayed.
    // 6. Wait until deleting has dissapeared and empty is showing again.
    // 7. Check that the DayListItem with the text Monday also has the text "1 spot remaining"
  });

  it("loads data, edits an interview and the spots remain the same", async () => {
    // 1. Render the Application.
    const { container } = render(<Application />);
  
    // 2. Wait until the text "Archie Cohen" is displayed.
    await waitForElement(() => getByText(container, "Archie Cohen"));
    const appointment = getAllByTestId(container, "appointment").find(
      appointment => queryByText(appointment, "Archie Cohen")
    );
    fireEvent.click(getByAltText(appointment, "Edit"));
    fireEvent.change(getByPlaceholderText(appointment,  /enter student name/i), {
      target: { value: "Lydia Miller-Jones" }
    });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"))
    expect(getByText(appointment, "Saving")).toBeInTheDocument();
    await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
    expect(getByText(appointment, "Lydia Miller-Jones")).toBeInTheDocument();
    const day = getAllByTestId(container, "day").find(day =>
      queryByText(day, "Monday")
    );
    expect(getByText(day, "1 spot remaining")).toBeInTheDocument();
  });

  it("shows the save error when failing to save an appointment", async () => {
    axios.put.mockRejectedValueOnce();
      const { container } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointments = getAllByTestId(container, "appointment");
      const appointment = appointments[0];
      fireEvent.click(getByAltText(appointment, "Add"));
      fireEvent.change(getByPlaceholderText(appointment,  /enter student name/i), {
        target: { value: "Lydia Miller-Jones" }
      });
      fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
      fireEvent.click(getByText(appointment, "Save"))
      expect(getByText(appointment, "Saving")).toBeInTheDocument();
      await waitForElementToBeRemoved(() => getByText(appointment, "Saving"));
      expect(getByText(appointment, "Could not save appointment.")).toBeInTheDocument();
      fireEvent.click(getByAltText(appointment, "Close"))
      expect(getByPlaceholderText(appointment, /enter student name/i)).toBeInTheDocument();

  });

  it("shows the delete error when failing to delete an existing appointment", async () => {
    axios.delete.mockRejectedValueOnce();
    const { container } = render(<Application />);
      await waitForElement(() => getByText(container, "Archie Cohen"));
      const appointment = getAllByTestId(container, "appointment").find(
        appointment => queryByText(appointment, "Archie Cohen")
      );
      fireEvent.click(getByAltText(appointment, "Delete"));
      expect(getByText(appointment, "Delete the appointment?")).toBeInTheDocument();
      fireEvent.click(getByText(appointment, "Confirm"));
      // 4. Click the confirm buttom.
      expect(getByText(appointment, "Deleting")).toBeInTheDocument();
      await waitForElementToBeRemoved(() => getByText(appointment, "Deleting"));
      expect(getByText(appointment, "Could not delete appointment.")).toBeInTheDocument();
      fireEvent.click(getByAltText(appointment, "Close"))
      expect(getByText(appointment, "Archie Cohen")).toBeInTheDocument();

  });
  
})

