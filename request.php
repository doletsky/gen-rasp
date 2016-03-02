<?php
header('Content-Type: application/javascript');
$month = $_GET['month'];
$year = $_GET['year'];
$today = $_GET['today'];
$trp = 0;//$_GET['trp'];
$header = 0;//$_GET['header'];
$lives = 5;//$_GET['lives'];
$scripture = 0;//$_GET['scripture'];
$dt = 1;//$_GET['dt'];

if($today=='0'){//all days in month
    $countDay=cal_days_in_month(CAL_GREGORIAN, $month, $year);
    if(strlen($month)==1)$month='0'.$month;
    for($i=1;$i<=$countDay;$i++){
        $contents = file_get_contents("http://www.holytrinityorthodox.com/ru/calendar/calendar.php?month=$month&today=$i&year=$year&dt=$dt&header=$header&lives=$lives&trp=$trp&scripture=$scripture");
        if(strlen($i)==1) $day='0'.$i;
        else $day=$i;
        $arCont[$year.$month.$day]=explode(PHP_EOL,strip_tags(mb_convert_encoding($contents, "utf-8", "windows-1251")));
    }
}else{
    if(strlen($month)==1)$month='0'.$month;
    $contents = file_get_contents("http://www.holytrinityorthodox.com/ru/calendar/calendar.php?month=$month&today=$today&year=$year&dt=$dt&header=$header&lives=$lives&trp=$trp&scripture=$scripture");
    if(strlen($today)==1) $day='0'.$today;
    else $day=$today;
    $arCont[$year.$month.$day]=explode(PHP_EOL,strip_tags(mb_convert_encoding($contents, "utf-8", "windows-1251")));
}
$cBName='fun';
if(isset($_GET['callback'])) $cBName=$_GET['callback'];
    echo $cBName."(".json_encode( $arCont ).");";

?>



