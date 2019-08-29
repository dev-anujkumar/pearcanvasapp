<h2>Element Saprator Component :</h2>
    <h5>USECASE :</h5> 
    <p>In Cypress this component does the following things</p>
            <h5>1. Spliting a slate</h5>
            <h5>2. Adding the different types of Elements like</h5> 
                <li>Image Element</li>
                <li>Interactive Element</li>
                <li>Audio/Video Element</li>
                <li>Container Element</li>
                <li>Worked Example Element</li>
                <li>Text Element</li>
                <li>Assessment Element</li>

<h2>Syntax for using Element Saprator ** Component **</h2>

    <ElementSaprator esProps = {esProps} elementType = {elementType} />

<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-0pky">PropName</th>
    <th class="tg-0pky">Type</th>
    <th class="tg-0pky">isRequired</th>
  </tr>
  <tr>
    <td class="tg-0pky">esProps</td>
    <td class="tg-0pky">Array of Objects</td>
    <td class="tg-0pky">Required</td>
  </tr>
  <tr>
    <td class="tg-0pky">elementType</td>
    <td class="tg-0pky">String</td>
    <td class="tg-0pky">Optional</td>
  </tr>
  <tr>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
    <td class="tg-0pky"></td>
  </tr>
</table>
    
<p>Sample of esProps</p>
const esProps = [
  {
    buttonType : 'text-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'text',
    tooltipDirection : 'left'
  },
  {
    buttonType : 'image-elem',
    buttonHandler : splithandlerfunction,
    tooltipText : 'image',
    tooltipDirection : 'left'
  }
]

<p>Object Structure of esProps</p>
<style type="text/css">
.tg  {border-collapse:collapse;border-spacing:0;}
.tg td{font-family:Arial, sans-serif;font-size:14px;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg th{font-family:Arial, sans-serif;font-size:14px;font-weight:normal;padding:10px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;border-color:black;}
.tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
</style>
<table class="tg">
  <tr>
    <th class="tg-0pky">Key</th>
    <th class="tg-0pky">Type</th>
    <th class="tg-0pky">eg value</th>
    <th class="tg-0pky">description</th>
  </tr>
  <tr>
    <td class="tg-0pky">buttonType</td>
    <td class="tg-0pky">String</td>
    <td class="tg-0pky">text-elem</td>
    <td class="tg-0pky">Type of the button</td>
  </tr>
  <tr>
    <td class="tg-0pky">buttonHandler</td>
    <td class="tg-0pky">Function</td>
    <td class="tg-0pky">splithandlerfunction</td>
    <td class="tg-0pky">Handler function for button</td>
  </tr>
  <tr>
    <td class="tg-0pky">tooltipText</td>
    <td class="tg-0pky">String</td>
    <td class="tg-0pky">text</td>
    <td class="tg-0pky">Tooltip text on the button</td>
  </tr>
  <tr>
    <td class="tg-0pky">tooltipDirection</td>
    <td class="tg-0pky">String</td>
    <td class="tg-0pky">left</td>
    <td class="tg-0pky">direction of the tooltip</td>
  </tr>
</table>