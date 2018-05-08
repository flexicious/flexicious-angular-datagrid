declare var flexiciousNmsp: any;

flexiciousNmsp.themes.push({
    id: 'redAndBlack',
    name: 'redAndBlack',
    styles: {

        /**
         * Usually the toolbar root is the same as the images root, but for some custom themes, we have their own icons.
         */

        toolbarImagesRoot: flexiciousNmsp.Constants.IMAGE_PATH + '/themeIcons/itunes/32',

        pagerRowHeight: 50,

        pagerStyleName: 'whiteText largeIcons',

        headerStyleName: 'whiteText',

        columnGroupStyleName: 'whiteText',

        footerStyleName: 'whiteText',

        alternatingItemColors: [0xFFFFFF, 0xFFFFFF],

        alternatingTextColors: [0x000000, 0x000000],

        selectionColor: [0xFABB39, 0xFABB39],

        rollOverColor: 0xCEDBEF,

        headerRollOverColors: [0x1C1E1D, 0x3A3B3D],

        headerColors: [0x1C1E1D, 0x3A3B3D],

        columnGroupRollOverColors: [0x1C1E1D, 0x3A3B3D],

        columnGroupColors: [0x1C1E1D, 0x3A3B3D],

        pagerRollOverColors: [0x1C1E1D, 0x3A3B3D],

        pagerColors: [0x1C1E1D, 0x3A3B3D],

        footerRollOverColors: [0x1C1E1D, 0x3A3B3D],

        footerColors: [0x1C1E1D, 0x3A3B3D],

        filterRollOverColors: [0x1C1E1D, 0x3A3B3D],

        filterColors: [0x1C1E1D, 0x3A3B3D],

        fixedColumnFillColors: [0xEFEFEF, 0xEFEFEF],

        activeCellColor: 0xB7DBFF,

        rendererRollOverColors: [0xFFFFFF, 0xFFFFFF],

        rendererColors: [0xFFFFFF, 0xFFFFFF],

        textSelectedColor: 0x000000,

        textRollOverColor: 0x000000,

        borderColor: 0xFF0000,

        columnGroupVerticalGridLineColor: 0xFF0000,

        columnGroupVerticalGridLines: true,

        columnGroupVerticalGridLineThickness: 1,



        columnGroupHorizontalGridLineColor: 0xFF0000,

        columnGroupHorizontalGridLines: true,

        columnGroupHorizontalGridLineThickness: 1,

        columnGroupDrawTopBorder: false,







        headerVerticalGridLineColor: 0xFF0000,

        headerVerticalGridLines: true,

        headerVerticalGridLineThickness: 1,



        headerHorizontalGridLineColor: 0xFF0000,

        headerHorizontalGridLines: true,

        headerHorizontalGridLineThickness: 1,

        headerDrawTopBorder: false,

        headerSortSeparatorRight: 16,



        filterVerticalGridLineColor: 0xFF0000,

        filterVerticalGridLines: true,

        filterVerticalGridLineThickness: 1,



        filterHorizontalGridLineColor: 0xFF0000,

        filterHorizontalGridLines: true,

        filterHorizontalGridLineThickness: 1,

        filterDrawTopBorder: false,



        footerVerticalGridLineColor: 0xFF0000,

        footerVerticalGridLines: true,

        footerVerticalGridLineThickness: 1,



        footerHorizontalGridLineColor: 0xFF0000,

        footerHorizontalGridLines: false,

        footerHorizontalGridLineThickness: 1,

        footerDrawTopBorder: false,



        pagerVerticalGridLineColor: 0xFF0000,

        pagerVerticalGridLines: true,

        pagerVerticalGridLineThickness: 1,



        pagerHorizontalGridLineColor: 0xFF0000,

        pagerHorizontalGridLines: true,

        pagerHorizontalGridLineThickness: 1,





        rendererVerticalGridLineColor: 0xFF0000,

        rendererVerticalGridLines: true,

        rendererVerticalGridLineThickness: 1,



        rendererHorizontalGridLineColor: 0xFF0000,

        rendererHorizontalGridLines: true,

        rendererHorizontalGridLineThickness: 1,

        rendererDrawTopBorder: false,

    }

});

export default class DummyThemes {
    constructor() {
    }
}
