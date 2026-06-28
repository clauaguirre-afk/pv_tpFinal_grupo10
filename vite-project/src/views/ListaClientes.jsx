
export const ListaClientes = () => {
  const { clientes, cargando, error } = useClientes();
  const [busqueda, setBusqueda] = useState('');

  const clientesFiltrados = clientes.filter((cliente) => {
    const termino = busqueda.toLowerCase();
    const apellido = cliente.name?.lastname?.toLowerCase() || '';
    const city = cliente.address?.city?.toLowerCase() || '';

    return apellido.includes(termino) || city.includes(termino);
  });

  if (cargando) {
    return <Loader mensaje="Cargando lista de clientes, por favor espere..."/>;
  }

  if (error) {
    return (
      <Box sx={{ mt: 3 }}>
        <Alert severity="error" variant="filled" sx={{ borderRadius: 3 }}>
          <Typography variant="subtitle1" fontWeight="bold">
            Ocurrió un problema de conexión
          </Typography>
          {error}
        </Alert>
      </Box>
    );
  }

  return (
    <Paper elevation={2} sx={{ p: 3, borderRadius: 3, mt: 3 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, color: 'primary.main'}}>
        Listado de Clientes Activos
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar por apellido o ciudad..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
              sx: { borderRadius: 3 }
            }       
          }}      
        />
      </Box>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Nombre Completo</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Teléfono</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Ciudad</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientesFiltrados.length > 0 ? (
              clientesFiltrados.map((cliente) => (
                <TableRow key={cliente.id} hover>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{`${cliente.name?.firstname} ${cliente.name?.lastname}`}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.phone || 'N/D'}</TableCell>
                  <TableCell>{cliente.address?.city || 'N/D'}</TableCell>
                  <TableCell align="center">
                    <Button
                      component={Link}
                      to={`/clientes/${cliente.id}`}
                      variant="contained"
                      size="small"
                    >            
                      Ver ficha completa
                    </Button> 
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography color="text.secondary" sx={{ py: 2 }}>
                    No se encontraron clientes que coincidan con la búsqueda.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
