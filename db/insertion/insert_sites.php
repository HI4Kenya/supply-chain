<?php
	// Require system config file
    require '../../system/config.php';

    session_start();
    // Validate a user has logged in
    // If not logged in, redirect to the log in page
    if(!isset($_SESSION['login_id']))
    {
        header('Location:../../');
    }
    else
    {
        // If user has logged in
		require '../db_auth/db_con.php';

		$id= $_POST['data'];
		$facility_type = $_POST['type'];
		$central_id = $_POST['parent'];
		$program = $_POST['program'];

		// Sub-County Stores
		if($facility_type=="Sub-County Store")
		{
			$classification = "Sub-County Store";
			//Check if the facility exists
			$exists = "SELECT * FROM sub_county_stores WHERE sub_county_store_id = '$id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}

				else
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// central site for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Central Site'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 12;
					}

					else
					{
						// Check if facility_program mapping exists from the facility_program_mapping table as a
						// stand alone facility for this program
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}

						else
						{
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
							VALUES ('$id','$program','$classification')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 11;
								// Updated the mapping
							}

							else
							{
								echo -1;
							}
						}
					}
				}
			}

			else
			{
				$check_central = "SELECT * FROM central_site WHERE central_id = '$id'";
				$received_response = mysqli_query($conn,$check_central);
				if(mysqli_num_rows($received_response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// central site for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Central Site'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 12;
					}
				}
				else
				{
					$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
					$response = mysqli_query($conn,$check);
					if(mysqli_num_rows($response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}

						else
						{
							$sql = "INSERT INTO sub_county_stores(sub_county_store_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
									VALUES ('$id','$program','$classification')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}

						}
					}

					else
					{
						$sql = "INSERT INTO sub_county_stores(sub_county_store_id)
						VALUES ('$id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
								VALUES ('$id','$program','$classification')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}
					}

				}
			}
		}

		// Central Sites
		else if($facility_type=="Central Site")
		{
			$classification = "Central Site";
			//Check if the facility exists
			$exists = "SELECT * FROM central_site WHERE central_id = '$id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}

				else
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// sub-county store for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Sub-County Store'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 12;
					}
					else
					{
						// Check if facility_program mapping exists from the facility_program_mapping table as a
						// stand alone facility for this program
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}

						else
						{
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
							VALUES ('$id','$program','$classification')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 11;
								// Updated the mapping
							}

							else
							{
								echo -1;
							}
						}

					}
				}
			}

			else
			{
				// Check if facility exists as a sub county store
				$check_central = "SELECT * FROM sub_county_store WHERE sub_county_store_id = '$id'";
				$received_response = mysqli_query($conn,$check_central);
				if(mysqli_num_rows($received_response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// sub-county store for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Sub-County Store'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 12;
					}
				}

				else
				{
					$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
					$response = mysqli_query($conn,$check);
					if(mysqli_num_rows($response)>0)
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = 'StandAlone'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 10;
						}

						else
						{
							$sql = "INSERT INTO central_site(central_id)
							VALUES ('$id')";

							if (mysqli_query($conn, $sql)) 
							{
								// Check if facility_program mapping exists from the facility_program_mapping table
								$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
								AND program_id = '$program' AND classification = '$classification'";
								$mappingResult = mysqli_query($conn,$checkMapping);
								if(mysqli_num_rows($mappingResult)>0)
								{
									echo 11;
								}

								else
								{
									$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
									VALUES ('$id','$program','$classification')";
									if (mysqli_query($conn, $mappingQuery))
									{
										echo 0;
									}

									else
									{
										echo -1;
									}
								}
							} 
							else 
							{
							    echo -1;
							}

						}
					}

					else
					{
						$sql = "INSERT INTO central_site(central_id)
						VALUES ('$id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
								VALUES ('$id','$program','$classification')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}
					}

				}
			}
		}

		// Satellite Sites
		else if($facility_type=="Satellite Site")
		{
			$classification = "Satellite Site";
			//Check if the facility exists
			$exists = "SELECT * FROM satelite_site WHERE satelite_id = '$id' AND central_id = '$central_id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}

				else
				{
					// Check if facility_program mapping exists from the facility_program_mapping table as a
					// stand alone facility for this program
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'StandAlone'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 10;
					}

					else
					{
						$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
						VALUES ('$id','$program','$classification')";
						if (mysqli_query($conn, $mappingQuery))
						{
							echo 11;
							// Updated the mapping
						}

						else
						{
							echo -1;
						}
					}
				}
			}

			else
			{
				$check = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
				$response = mysqli_query($conn,$check);
				if(mysqli_num_rows($response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'StandAlone'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 10;
					}

					else
					{
						$sql = "INSERT INTO satelite_site(satelite_id,central_id)
						VALUES ('$id','$central_id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
								VALUES ('$id','$program','$classification')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}

					}
				}
				else
				{
					$sql = "INSERT INTO satelite_site(satelite_id,central_id)
					VALUES ('$id','$central_id')";

					if (mysqli_query($conn, $sql)) 
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = '$classification'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 11;
						}

						else
						{
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
							VALUES ('$id','$program','$classification')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 0;
							}

							else
							{
								echo -1;
							}
						}
					} 
					else 
					{
					    echo -1;
					}
				}
			}

		}

		// Stand alone sites
		else if ($facility_type=="StandAlone")
		{
			$classification = "StandAlone";
			//Check if the facility exists
			$exists = "SELECT * FROM standalone_site WHERE standalone_id = '$id'";
			$result = mysqli_query($conn,$exists);
			if(mysqli_num_rows($result)>0)
			{
				// Check if facility_program mapping exists from the facility_program_mapping table
				$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
				AND program_id = '$program' AND classification = '$classification'";
				$mappingResult = mysqli_query($conn,$checkMapping);
				if(mysqli_num_rows($mappingResult)>0)
				{
					echo 1;
				}

				else
				{
					$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
					VALUES ('$id','$program','$classification')";
					if (mysqli_query($conn, $mappingQuery))
					{
						echo 11;
						// Updated the mapping
					}

					else
					{
						echo -1;
					}
				}
			}

			else
			{
				$check = "SELECT * FROM central_site WHERE central_id = '$id'";
				$response = mysqli_query($conn,$check);
				if(mysqli_num_rows($response)>0)
				{
					// Check if facility_program mapping exists from the facility_program_mapping table
					// as a central site
					$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
					AND program_id = '$program' AND classification = 'Central Site'";
					$mappingResult = mysqli_query($conn,$checkMapping);
					if(mysqli_num_rows($mappingResult)>0)
					{
						echo 10;
					}

					else
					{
						$sql = "INSERT INTO standalone_site(standalone_id)
						VALUES ('$id')";

						if (mysqli_query($conn, $sql)) 
						{
							// Check if facility_program mapping exists from the facility_program_mapping table
							$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
							AND program_id = '$program' AND classification = '$classification'";
							$mappingResult = mysqli_query($conn,$checkMapping);
							if(mysqli_num_rows($mappingResult)>0)
							{
								echo 11;
							}

							else
							{
								$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
								VALUES ('$id','$program','$classification')";
								if (mysqli_query($conn, $mappingQuery))
								{
									echo 0;
								}

								else
								{
									echo -1;
								}
							}
						} 
						else 
						{
						    echo -1;
						}

					}
				}

				else
				{
					$sql = "INSERT INTO standalone_site(standalone_id)
					VALUES ('$id')";

					if (mysqli_query($conn, $sql)) 
					{
						// Check if facility_program mapping exists from the facility_program_mapping table
						$checkMapping = "SELECT * FROM facility_program_mapping WHERE facility_id = '$id'
						AND program_id = '$program' AND classification = '$classification'";
						$mappingResult = mysqli_query($conn,$checkMapping);
						if(mysqli_num_rows($mappingResult)>0)
						{
							echo 1;
						}

						else
						{
							$mappingQuery = "INSERT INTO facility_program_mapping(facility_id,program_id,classification)
							VALUES ('$id','$program','$classification')";
							if (mysqli_query($conn, $mappingQuery))
							{
								echo 0;
							}

							else
							{
								echo -1;
							}
						}
					} 
					else 
					{
					    echo -1;
					}
				}

			}

		}
		mysqli_close($conn);
	}
?> 