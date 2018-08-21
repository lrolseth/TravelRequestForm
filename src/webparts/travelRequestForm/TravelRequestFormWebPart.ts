import * as React from "react";
import * as ReactDom from "react-dom";
import { Version } from "@microsoft/sp-core-library";
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from "@microsoft/sp-webpart-base";

import * as strings from "TravelRequestFormWebPartStrings";
import TravelRequestForm from "./components/TravelRequestForm";
import { ITravelRequestFormProps } from "./components/ITravelRequestFormProps";

import pnp from "@pnp/pnpjs";
import { Util } from "@pnp/common";
import { sp } from "@pnp/sp";



export interface ITravelRequestFormWebPartProps {
  description: string;
}

export default class TravelRequestFormWebPart extends BaseClientSideWebPart<ITravelRequestFormWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITravelRequestFormProps > = React.createElement(
      TravelRequestForm,
      {
        description: this.properties.description
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse("1.0");
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
