
### This is an instruction on how to use this web application:


**1.** Start by doing usual **npm install** and **npm start** when using Node.

**2.** If when you start loading and creating data you notice that your fund id's can't get data from **Luminor API**, go to **src** folder of the project and find **config.js**. This means that outside server provided by my friend is not available and you need to set up a certain **json.php** file provided in main directory yourself. One way of doing this is using **XAMPP** or similar setup/config tools and put a copy of this file in **C:\xampp\htdocs\...**, then reference it in config file mentioned before **http://localhost/.../json.php?url=**. If you haven't already, in **XAMPP** start Apache server. The purpose of all this manipulation is to bypass a **CORS** header blocker that Luminor has not cleared on their side and use php API to load json information "server side" because browsers can run into aforementioned **CORS** problem.

**3.** At this point you want to create your own file for storage, name does not matter and extension is only important for what other uses you'll have for this file later, but for example create a **.csv file**. An example of what it should be formatted as see **test.csv** or just load it and get familiar with how controls work. Once you have any file, empty or filled, load it using **Upload file** button.

**4.** This brings up a list of Funds in upper left side that you can begin clicking individually, if there are any items in it and if those items have any purchase information (which they should) on the lower part you'll see the details of those purchases. Fund information is displayed in upper right side.

**5.** If you see NaN's you either provided a wrong Fund id that Luminor API does not recognise or you can't access the API itself, refer to **2.** for how to fix that.

**6.** You can sort table colums by clicking them, alternating clicks change sorting direction.

**7.** Once you're done you can save information currently present in the app to the file of same title you loaded (you don't need to input anything regarding that). Most browsers place those files in Downloads. There is a restriction that you must provide a source file before saving.


### There are 6 controls provided to manipulate data in app:


**1. Create Fund:** you can create a Fund that does not have exact name and id of another Fund. ID has to be a certain number, check for exact values in Luminor Fund reference.

**2. Update Fund:** you can update fund you clicked last, same ID rules apply (names are not strictly used in calculations, they're mostly representative).

**3. Delete Fund:** you can delete last Fund you clicked.

**4. Create Purchase:** you can create any amount of Purchases even with identical values. They all are added to the Fund you clicked last. Do be careful to use proper numeric values for correct calculations. Dates are not strictly checked but for your own convienence use proper dates.

**5. Update Purchase:** you can update last Purchase you clicked.

**6. Delete Purchase:** you can delete last Purchase you clicked.



**Note:** clicking funds or purchases fill in text fields provided and/or you can edit those fields yourself.

**Note:** all manipulations are immediately reflected on the last clicked Fund displayed on upper right section.

**An example can be seen in:** https://github.com/ViktorasZigaras/React-Web-Stock-Analysis/blob/master/Screenshot%20(3).png
