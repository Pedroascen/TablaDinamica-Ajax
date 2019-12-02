package com.cds.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.cds.demo.entity.Persona;
import com.cds.demo.repository.IPersonaRepository;

@Controller
@RequestMapping("persona")
public class PersonaController {

	//relacion con los datos
	@Autowired
	IPersonaRepository erPersona;
	
	//metodo para listar
	@GetMapping("listar")
	public String lista() {
		return "persona/crud";
	}
	
	//metodos para listar los json
	@GetMapping("valores")
	@ResponseBody
	public List<Persona> getAll(){
		return (List<Persona>) erPersona.findAll();
	}
	
	//metodo para guardar
	@PostMapping(value="guardarMod", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Boolean guarda(
			@RequestParam Integer id,
			@RequestParam String nombre,
			@RequestParam String apellido,
			@RequestParam Integer edad) {
		
		Persona p = new Persona();
		if (id!=null) 
			p.setId(id);
			p.setNombre(nombre);
			p.setApellido(apellido);
			p.setEdad(edad);

		erPersona.save(p);
		return true;
	}
	
	//metodo para modificar
	@GetMapping(value="modificar/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public Persona ModalModifica( @PathVariable Integer id) {
		return erPersona.findById(id).get();
	}
	
	//metodo para eliminar
	@GetMapping(value="eliminar/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
	@ResponseBody
	public boolean elimina(@PathVariable Integer id) {
	    Persona p = erPersona.findById(id).get();
	    erPersona.delete(p);
		return true;
	}
	
}
