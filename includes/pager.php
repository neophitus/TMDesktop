<?php

class Pager{

/**
 * @calculate paging inforomation
 *
 * @access public static
 *
 * @param int $num_pages
 *
 * @param int $limit
 *
 * @param $page
 *
 * @return object
 *
 **/
public static function getPagerData($num_pages, $limit, $page){
    /*** the number of pages ***/
    $num_pages = ceil($num_pages / $limit);
    $page = max($page, 1);
    $page = min($page, $num_pages);
    /*** calculate the offset ***/
    $offset = ($page - 1) * $limit;
    /*** a new instance of stdClass ***/
    $ret = new stdClass;

    /*** assign the variables to the return class object ***/
    $ret->offset   = $offset;
    $ret->limit    = $limit;
    $ret->num_pages = $num_pages;
    $ret->page     = $page;
    /*** return the object ***/
    return $ret;
}

} /*** end of class ***/
?>