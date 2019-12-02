package com.cds.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * AjaxController
 */
@Controller
@RequestMapping("prueba")
public class AjaxController {

    @GetMapping(value = {"/","vista"})
    public String name() {
        return "vista/view";
    }
    @GetMapping("vista1")
    public String name2() {
        return "vista/view2";
    }
    @GetMapping("vista2")
    public String name3() {
        return "vista/view3";
    }
}