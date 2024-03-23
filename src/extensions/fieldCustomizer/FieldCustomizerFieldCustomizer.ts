import { Log } from '@microsoft/sp-core-library';

import {

  BaseFieldCustomizer,

  IFieldCustomizerCellEventParameters

} from '@microsoft/sp-listview-extensibility';
 
import * as strings from 'FieldCustomizerFieldCustomizerStrings';

import styles from './FieldCustomizerFieldCustomizer.module.scss';
 
export interface IFieldCustomizerFieldCustomizerProperties {

  sampleText?: string;

}
 
const LOG_SOURCE: string = 'FieldCustomizerFieldCustomizer';
 
export default class FieldCustomizerFieldCustomizer

  extends BaseFieldCustomizer<IFieldCustomizerFieldCustomizerProperties> {
 
  public onInit(): Promise<void> {

    Log.info(LOG_SOURCE, 'Activated FieldCustomizerFieldCustomizer with properties:');

    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));

    Log.info(LOG_SOURCE, `The following string should be equal: "FieldCustomizerFieldCustomizer" and "${strings.Title}"`);

    return Promise.resolve();

  }
 
  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {

    const value: number = parseFloat(event.fieldValue);
 
    // Calculate circumference and dash offset

    const circleSize = 40; // Adjust as needed

    const radius = circleSize / 2;

    const circumference = 2 * Math.PI * radius;

    const dashOffset = circumference * (1 - (value / 100));
 
    const svg = `

      <svg width="${circleSize}" height="${circleSize}">

        <circle cx="${radius}" cy="${radius}" r="${radius}" fill="none" stroke-width="2" stroke="#ccc" />

        <circle cx="${radius}" cy="${radius}" r="${radius}" fill="none" stroke-width="2" stroke="${this.getColor(value)}" 

          stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}" />

        <text x="${radius}" y="${radius}" text-anchor="middle" dominant-baseline="middle" fill="${this.getColor(value)}">${value}%</text>

      </svg>

    `;
 
    event.domElement.innerHTML = `

      <div class="${styles.fieldCustomizer}">

       

          ${svg}

        

      </div>

    `;

  }
 
  private getColor(value: number): string {

    if (value <= 40) {

      return 'red';

    } else if (value <= 60) {

      return '#bf7104';

    } else {

      return 'green';

    }

  }
 
  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {

    super.onDisposeCell(event);

  }

}
