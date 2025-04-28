<!-- Summary Section with Navigation -->

<div style="background:rgb(26, 26, 26); padding: 1.5rem; margin-bottom: 2rem; border-radius: 4px; text-align: center;">
<a href="#introduction" style="color: #007bff; text-decoration: none; margin: 0 10px;">🌟 Introduction</a>
<a href="#game" style="color: #007bff; text-decoration: none; margin: 0 10px;">👾 Gameplay </a>
<a href="#steam" style="color: #007bff; text-decoration: none; margin: 0 10px;">👨‍💻 Custom Netcode</a>
<a href="#lesson" style="color: #007bff; text-decoration: none; margin: 0 10px;">📌 Lessons Learned </a>

</div>

<!-- Main Content with Anchor -->
<div id="introduction" style="display: flex; align-items: flex-start; gap: 2rem; margin: 2rem 0; max-width: 1200px; margin-left: auto; margin-right: auto;">
    <div style="flex: 1; padding: 0 15px; color: #fff; text-align: justify; line-height: 1.6; max-width: 600px;">
        <h2 style="font-size: 2rem; color: #007bff; margin-bottom: 1.5rem;">🌟 Introduction</h2>
        <p style="margin-bottom: 1.2rem;">
            Space Multiplayer is a end of course project where we had to develope a multiplayer game in one week in groups of two. The constrains were that we had to use Enet6 and any engine of our choice (we choose Unity) .
        </p>
        <p style="margin-bottom: 1.2rem;">
            We implemented advanced features such as :
            <ul style="margin-top: 0.5rem; padding-left: 1.2rem;">
            <li>Socket-based server-client communication</li>
            <li>Data serialization</li>
            <li>Server authoritative movement with client-side prediction</li>
            <li>Health System</li>
            <li>Skins and Username</li>
            <li>Leaderboard</li>
        </ul>
        </p>
    </div>
    <img src="https://i.imgur.com/HqrZtYh.png" 
         alt="Featured Concept Art" 
         style="max-width: 500px; width: 100%; height: auto; border-radius: 8px; object-fit: cover; align-self: center;">
</div>


<div id="game" style="margin: 4rem auto; max-width: 1200px; padding: 0 1rem;">
    <div style="color: #fff; text-align: justify; line-height: 1.6;">
        <h2 style="font-size: 2rem; color: #007bff; margin-bottom: 1.5rem;">👾 Gameplay</h2>
        <p style="margin-bottom: 1.2rem;">
            The gameplay is really simple, it is a simple space shooter. You first write your username, the server's ip address and choose your spaceship's skin. Then you enter the game where you can left click to shoot with server-side Raycasts yu also have an energy bar so you cant shoot infinitly. All the players have health bars and when you get killed you see the leaderboard and a countdown and the camera follows the person that killed you.
        </p>
    </div>
</div>
<div id="steam" style="display: flex; align-items: center; margin: 2rem 0;">
    <div style="flex: 1; color: #fff;">
        <h2 style="font-size: 2rem; color: #007bff;">👨‍💻 Custom Netcode</h2>
        <ul style="font-size: 120%;">
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Client</span>
                <p style="margin-bottom: 1.2rem;">
                    This class handles all the possible packets the server sends to the client. It instantiate the players gameObjects, move all the client's player with prediction and reconciliation and other clients with state synchronisations.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/pO8U0qV.png" alt="Network Diagram" 
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        NetworkClient.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class PlayerData
    {
        public InitData initData;
        public Transform playerTransform;
        public SpaceMovement spaceMovement;
        public List<PlayerInputData> predictedInput = new List<PlayerInputData>();
        public ShootManager shoot;
        public OtherClientUIManager otherUIManager;
        public ushort score;
    }


    public class NetworkClient : MonoBehaviour
    {
        private ENet6.Host enetHost = null;
        private ENet6.Peer? serverPeer = null;


        PlayerData ownPlayer;
        PacketBuilder packetBuilder = null;
        uint currentId = 0;

        Dictionary<uint, PlayerData> players = new();

        [SerializeField] CinemachineVirtualCamera virtualCamera;
        [SerializeField] GameObject client;
        [SerializeField] GameObject otherClient;
        [SerializeField] ClientGlobalInfo clientInfo;
        [SerializeField] GameObject deathParticles;

        private float tickRate = 1f / 75f;
        private float tickTime;

        public bool Connect(string addressString)
        {
            ENet6.Address address = new ENet6.Address();
            if (!address.SetHost(ENet6.AddressType.Any, addressString))
            {
                Debug.LogError("failed to resolve \"" + addressString + "\"");
                return false;
            }

            address.Port = 14769;
            Debug.Log("connecting to " + address.GetIP());


            // On recréé l'host à la connexion pour l'avoir en IPv4 / IPv6 selon l'adresse
            if (enetHost != null)
                enetHost.Dispose();

            enetHost = new ENet6.Host();
            enetHost.Create(address.Type, 1, 0);
            serverPeer = enetHost.Connect(address, 0);

            // On laisse la connexion se faire pendant un maximum de 50 * 100ms = 5s
            for (uint i = 0; i < 50; ++i)
            {
                ENet6.Event evt = new ENet6.Event();
                if (enetHost.Service(100, out evt) > 0)
                {
                    Debug.Log("Successfully connected !");
                    packetBuilder = new PacketBuilder(serverPeer.Value, 0);
                    // Nous avons un événement, la connexion a soit pu s'effectuer (ENET_EVENT_TYPE_CONNECT) soit échoué (ENET_EVENT_TYPE_DISCONNECT)
                    break; //< On sort de la boucle
                }
            }

            if (serverPeer.Value.State != PeerState.Connected)
            {
                Debug.LogError("connection to \"" + addressString + "\" failed");
                return false;
            }

            return true;
        }

        // Start is called before the first frame update
        void Start()
        {
            if (!ENet6.Library.Initialize())
                throw new Exception("Failed to initialize ENet");

            if (Connect(clientInfo.ip))
            {
                ownPlayer = new PlayerData() { initData = new InitData() { clientInitData = new ClientInitData() { matId = (byte)clientInfo.matId, playerName = clientInfo.playerName, skinId = (byte)clientInfo.skinId } } };
                packetBuilder.SendPacket(new ClientInitData(clientInfo.playerName, clientInfo.skinId, clientInfo.matId));
            }
        }

        private void OnApplicationQuit()
        {
            ENet6.Library.Deinitialize();
        }

        private void Update()
        {
            if (Time.time >= tickTime && ownPlayer.spaceMovement != null)
            {
                tickTime += tickRate;
                ownPlayer.spaceMovement.AdvanceSpaceShip(tickRate);

                //tick reseau d'envoie d'inputs
                SendPlayerInputs();
            }
        }

        void FixedUpdate()
        {
            ENet6.Event evt = new ENet6.Event();
            if (enetHost.Service(0, out evt) > 0)
            {
                do
                {
                    switch (evt.Type)
                    {
                        case ENet6.EventType.None:
                            Debug.Log("?");
                            break;

                        case ENet6.EventType.Connect:
                            Debug.Log("Connect");
                            break;

                        case ENet6.EventType.Disconnect:
                            Debug.Log("Disconnect");
                            serverPeer = null;
                            break;

                        case ENet6.EventType.Receive:
                            byte[] buffer = new byte[1024];
                            evt.Packet.CopyTo(buffer);
                            HandleMessage(buffer);
                            Debug.Log("Receive");
                            break;

                        case ENet6.EventType.Timeout:
                            Debug.Log("Timeout");
                            break;
                    }
                }
                while (enetHost.CheckEvents(out evt) > 0);
            }
        }

        public void SendPlayerInputs()
        {
            Debug.Log("Send player inputs");
            PlayerInputData inputData = new PlayerInputData(currentId, ownPlayer.spaceMovement.moveInput, ownPlayer.playerTransform.rotation, ownPlayer.initData.serverClientInitData.playerNum, ownPlayer.spaceMovement.MoveSpeed);
            ownPlayer.predictedInput.Add(inputData);
            packetBuilder.SendPacket(inputData);
            currentId++;
        }

        public void SendPlayerShoot()
        {
            if (ownPlayer.spaceMovement)
            {
                packetBuilder.SendPacket(new ClientSendShoot(ownPlayer.initData.serverClientInitData.playerNum));
            }
        }

        private void HandleMessage(byte[] buffer)
        {
            int offset = 0;
            Opcode opcode = (Opcode)Serialization.DeserializeU8(buffer, ref offset);
            Debug.Log("Opcode" + opcode.ToString());
            switch (opcode)
            {
                case Opcode.OnClientConnectResponse:
                    {
                        ConnectServerInitData responseFromConnect = new();
                        responseFromConnect.Deserialize(buffer, ref offset);
                        GameObject player = Instantiate(client, responseFromConnect.playerStartPos, Quaternion.identity);
                        player.GetComponent<ClientSkinLoader>().LoadSkin(clientInfo.skinId, clientInfo.matId);

                        ownPlayer.initData.serverClientInitData = responseFromConnect;
                        ownPlayer.playerTransform = player.transform;
                        ownPlayer.spaceMovement = player.GetComponent<SpaceMovement>();
                        ownPlayer.shoot = player.GetComponent<ShootManager>();
                        ownPlayer.shoot.ShootEvent += SendPlayerShoot;

                        virtualCamera.Follow = player.transform;
                        virtualCamera.LookAt = player.transform;
                        UIManager.instance.UpdateLeaderBoard(ownPlayer.initData.clientInitData.playerName, 0);
                        break;
                    }

                case Opcode.OnOtherClientConnect:
                    {
                        InitData dataFromServer = new();
                        dataFromServer.Deserialize(buffer, ref offset);
                        GameObject player2 = Instantiate(otherClient, dataFromServer.serverClientInitData.playerStartPos, Quaternion.identity);
                        player2.GetComponent<ClientSkinLoader>().LoadSkin(dataFromServer.clientInitData.skinId, dataFromServer.clientInitData.matId);
                        OtherClientUIManager uIManager = player2.GetComponent<OtherClientUIManager>();
                        uIManager.LoadName(dataFromServer.clientInitData.playerName);
                        players.Add(dataFromServer.serverClientInitData.playerNum, new PlayerData() { playerTransform = player2.transform, initData = dataFromServer, otherUIManager = uIManager});
                        UIManager.instance.UpdateLeaderBoard(dataFromServer.clientInitData.playerName, 0);
                        break;
                    }

                case Opcode.FromServerPlayerPosition:
                    {
                        Debug.Log("Receive position FROM SERVER");
                        ServerToPlayerPosition positionFromServer = new();
                        positionFromServer.Deserialize(buffer, ref offset);

                        if (positionFromServer.playerNum == ownPlayer.initData.serverClientInitData.playerNum)
                        {
                            Debug.Log("PREDICTED CURRENT POSITION : " + ownPlayer.playerTransform.position + " with input ID : " + (currentId - 1));
                            Debug.Log("ROLL BACK POSITION : " + positionFromServer.position + " with input ID : " + positionFromServer.inputId);
                            ownPlayer.playerTransform.position = positionFromServer.position;
                            ownPlayer.playerTransform.rotation = positionFromServer.rotation;

                            ownPlayer.predictedInput.RemoveAll(input => input.inputId <= positionFromServer.inputId);


                            for (int i = 0; i < ownPlayer.predictedInput.Count; i++)
                            {
                                ownPlayer.spaceMovement.AdvanceSpaceShip(ownPlayer.predictedInput[i].moveInput, ownPlayer.predictedInput[i].rotation, tickRate);
                                Debug.Log("ADVANCE STEPS : " + ownPlayer.predictedInput[i].inputId + "To position : " + ownPlayer.playerTransform.position);
                            }
                        }
                        else
                        {
                            players[positionFromServer.playerNum].playerTransform.position = positionFromServer.position;
                            players[positionFromServer.playerNum].playerTransform.rotation = positionFromServer.rotation;
                        }

                        break;
                    }

            case Opcode.FromServerHealthUpdate:
                    {
                        ServerHealthUpdate serverHealthUpdate = new ServerHealthUpdate();
                        serverHealthUpdate.Deserialize(buffer, ref offset);
                        if (serverHealthUpdate.playerNumber == ownPlayer.initData.serverClientInitData.playerNum)
                        {
                            UIManager.instance.lifeBar.size = (float)serverHealthUpdate.health / (float)serverHealthUpdate.maxHealth;
                        }
                        else
                        {
                            players[serverHealthUpdate.playerNumber].otherUIManager.UpdateHealth(serverHealthUpdate.health, serverHealthUpdate.maxHealth);
                        }
                        break;
                    }

            case Opcode.LeaderBoardUpdate:
                    {
                        LeaderBoardUpdate leaderBoardUpdate = new LeaderBoardUpdate();
                        leaderBoardUpdate.Deserialize(buffer, ref offset);

                        if(leaderBoardUpdate.playerNum == ownPlayer.initData.serverClientInitData.playerNum)
                        {
                            ownPlayer.score = leaderBoardUpdate.score;
                            UIManager.instance.UpdateLeaderBoard(ownPlayer.initData.clientInitData.playerName, leaderBoardUpdate.score);
                        }
                        else
                        {
                            players[leaderBoardUpdate.playerNum].score = leaderBoardUpdate.score;
                            UIManager.instance.UpdateLeaderBoard(players[leaderBoardUpdate.playerNum].initData.clientInitData.playerName, leaderBoardUpdate.score);
                        }
                        break;
                    }

            case Opcode.ClientDead:
                {
                    ClientDead clientDead = new ClientDead();
                    clientDead.Deserialize(buffer, ref offset);

                    if(clientDead.playerKilled == ownPlayer.initData.serverClientInitData.playerNum)
                    {
                        ownPlayer.playerTransform.gameObject.SetActive(false);
                        virtualCamera.LookAt = players[clientDead.killedBy].playerTransform;
                        Instantiate(deathParticles, ownPlayer.playerTransform.position, Quaternion.identity);
                        UIManager.instance.ShowDeadUI();
                    }
                    else
                    {
                        if(players.TryGetValue(clientDead.playerKilled, out PlayerData deadPlayerData))
                        {
                            deadPlayerData.playerTransform.gameObject.SetActive(false);
                            Instantiate(deathParticles, deadPlayerData.playerTransform.position, Quaternion.identity);
                        }
                    }
                    
                    break;
                }
            case Opcode.ClientRespawn:
                {
                    ClientRespawn clientRespawn = new ClientRespawn();
                    clientRespawn.Deserialize(buffer, ref offset);

                    if (clientRespawn.playerNum == ownPlayer.initData.serverClientInitData.playerNum)
                    {
                        ownPlayer.playerTransform.gameObject.SetActive(true);
                        virtualCamera.LookAt = ownPlayer.playerTransform;
                        UIManager.instance.HideDeadUI();
                    }
                    else
                    {
                        if (players.TryGetValue(clientRespawn.playerNum, out PlayerData deadPlayerData))
                        {
                            deadPlayerData.playerTransform.gameObject.SetActive(true);
                        }
                    }

                    break;
                }
            }

        }
    }

</div>
        </div>
        </li>
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Server</span>
                <p style="margin-bottom: 1.2rem;">
                    This class is the same as the client class but handles the packets from the clients. Like clients connections, clients inputs, clients skin and name, clients shooting and the leaderboard.
                </p>
    </div>
        <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/WwRoMPC.jpeg" alt="Network Diagram" 
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
        <img src="https://i.imgur.com/HnoOBLb.gif" alt="Network Diagram" 
        style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        NetworkServer.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    class ServerClientData
    {
        public PacketBuilder packetBuilder;
        public InitData initData = new InitData();
        public List<PlayerInputData> playerInputsDatas = new List<PlayerInputData>();
        public Vector3 Position;

        public ushort health = 5;
        public Quaternion Rotation;

        public Transform transform;
        public ushort score;
    }

    public class NetworkServer : MonoBehaviour
    {
        private ENet6.Host enetHost = null;
        Dictionary<uint, ServerClientData> players = new();
        Dictionary<ushort, ushort> scoreboard = new ();
        [SerializeField] GameObject clientPrefab;

        private float tickDelay = 1f / 75f;
        private float tickTime;
        private ushort damagePerShoot = 1;
        private ushort maxHealth = 5;
        private float respawnTime = 5f;

        public bool CreateServer(string addressString)
        {
            ENet6.Address address = Address.BuildAny(AddressType.IPv6);
            address.Port = 14769;

            Debug.Log("Creating server : " + address.GetIP());

            // On recréé l'host à la connexion pour l'avoir en IPv4 / IPv6 selon l'adresse
            if (enetHost != null)
                enetHost.Dispose();

            enetHost = new ENet6.Host();
            enetHost.Create(AddressType.Any, address, 10, 0);

            return true;
        }

        private void Update()
        {
            if (Time.time >= tickTime)
            {
                tickTime += tickDelay;
                foreach (ServerClientData data in players.Values)
                {
                    if (data.playerInputsDatas.Count <= 0)
                        continue;

                    PlayerInputData lastPlayerInputs = data.playerInputsDatas[0];
                    data.playerInputsDatas.RemoveAt(0);

                    data.transform.rotation = lastPlayerInputs.rotation;
                    AdvancePhysics(lastPlayerInputs.moveInput, data.transform, lastPlayerInputs.moveSpeed, ref data.Position);
                    data.Rotation = lastPlayerInputs.rotation;
                    data.transform.position = data.Position;

                    Debug.Log("Server send player positions");
                    foreach (ServerClientData otherDatas in players.Values)
                    {
                        ServerToPlayerPosition serverPositionData = new ServerToPlayerPosition(lastPlayerInputs.inputId, data.Rotation, data.initData.serverClientInitData.playerNum, data.Position);
                        otherDatas.packetBuilder.SendPacket(serverPositionData);
                    }
                }
            }
        }

        private void AdvancePhysics (Vector2 moveInput, Transform transformShip, float moveSpeed, ref Vector3 position)
        {
            Vector3 movementZ = moveInput.y * transformShip.forward * moveSpeed * tickDelay;
            Vector3 movementX = moveInput.x * transformShip.right * moveSpeed * tickDelay;
            Vector3 movement = movementZ + movementX;

            position += movement;
        }

        // Start is called before the first frame update
        void Start()
        {
            if (!ENet6.Library.Initialize())
                throw new Exception("Failed to initialize ENet");

            CreateServer("localhost");
        }
        private void OnApplicationQuit()
        {
            ENet6.Library.Deinitialize();
        }

        // FixedUpdate est appelé à chaque Tick (réglé dans le projet)
        void FixedUpdate()
        {
            ENet6.Event evt = new ENet6.Event();
            if (enetHost.Service(0, out evt) > 0)
            {
                do
                {
                    switch (evt.Type)
                    {
                        case ENet6.EventType.None:
                            Debug.Log("?");
                            break;

                        case ENet6.EventType.Connect:
                            Debug.Log("Connect");
                            break;

                        case ENet6.EventType.Disconnect:
                            Debug.Log("Disconnect");
                            break;

                        case ENet6.EventType.Receive:
                            Debug.Log("Receive");
                            byte[] buffer = new byte[1024];
                            evt.Packet.CopyTo(buffer);
                            HandleMessage(evt.Peer,buffer);
                            break;

                        case ENet6.EventType.Timeout:
                            Debug.Log("Timeout");
                            break;
                    }
                }
                while (enetHost.CheckEvents(out evt) > 0);
            }
        }

        void Respawn(ServerClientData client)
        {
            client.health = maxHealth;
            float randomAngle = UnityEngine.Random.Range(0f, 360f);
            float randomSize = UnityEngine.Random.Range(50f, 200f);
            Vector2 randomPos = new Vector2(Mathf.Cos(randomAngle * Mathf.Deg2Rad) * randomSize, Mathf.Sin(randomAngle * Mathf.Deg2Rad) * randomSize);
            client.transform.position = new Vector3(randomPos.x , 0f , randomPos.y);
            client.Position = new Vector3(randomPos.x, 0f, randomPos.y);
        }

        private void HandleMessage(Peer peer, byte[] buffer)
        {
            int offset = 0;
            Opcode opcode = (Opcode)Serialization.DeserializeU8(buffer, ref offset);
            switch (opcode)
            {
                case Opcode.OnClientConnect:
                    ClientInitData dataFromClient = new ();
                    dataFromClient.Deserialize(buffer, ref offset);
                    ServerClientData serverClientData = new ServerClientData();
                    serverClientData.packetBuilder = new PacketBuilder(peer, 0);
                    serverClientData.initData.clientInitData = dataFromClient;
                    ConnectServerInitData serverInitData = new ConnectServerInitData((byte)(players.Count + 1), new Vector3(UnityEngine.Random.Range(-5, 6), 0, UnityEngine.Random.Range(-5, 6)));
                    serverClientData.initData.serverClientInitData = serverInitData;
                    serverClientData.packetBuilder.SendPacket<ConnectServerInitData>(serverInitData);

                    foreach (var player in players.Values)
                    {
                        player.packetBuilder.SendPacket<InitData>(serverClientData.initData);
                    }

                    foreach (var player in players.Values)
                    {
                        serverClientData.packetBuilder.SendPacket<InitData>(player.initData);
                    }

                    serverClientData.Position = serverInitData.playerStartPos;

                    serverClientData.transform = Instantiate(clientPrefab).transform;

                    players.Add(serverInitData.playerNum, serverClientData);
                    break;

                case Opcode.PlayerInputsData:
                    PlayerInputData dataFromPlayer = new ();
                    dataFromPlayer.Deserialize(buffer, ref offset);
                    players[dataFromPlayer.playerNum].playerInputsDatas.Add(dataFromPlayer);
                    break;

                case Opcode.ClientShoot:
                    ClientSendShoot clientSendShoot = new ();
                    clientSendShoot.Deserialize(buffer, ref offset);
                    players[clientSendShoot.ownPlayerNumber].transform.gameObject.SetActive(false);
                    Vector3 rayPos = players[clientSendShoot.ownPlayerNumber].transform.position;
                    Vector3 rayDir = players[clientSendShoot.ownPlayerNumber].transform.forward;
                    Debug.DrawLine(rayPos, rayDir * 200f, Color.red, 10f);


                    if(Physics.Raycast(rayPos, rayDir * 200f, out RaycastHit hitInfo))
                    {
                        byte playerHit = 0;

                        foreach (var player in players.Values)
                        {
                            if(player.initData.serverClientInitData.playerNum != clientSendShoot.ownPlayerNumber && player.transform == hitInfo.collider.transform)
                            {
                                player.health -= damagePerShoot;
                                playerHit = player.initData.serverClientInitData.playerNum;
                                if(player.health == 0)
                                {
                                    players[clientSendShoot.ownPlayerNumber].score++;
                                    StartCoroutine(RespawnRoutine(player));
                                    foreach (var playerScores in players.Values)
                                    {
                                        playerScores.packetBuilder.SendPacket(new LeaderBoardUpdate(clientSendShoot.ownPlayerNumber, players[clientSendShoot.ownPlayerNumber].score));
                                        playerScores.packetBuilder.SendPacket(new ClientDead(clientSendShoot.ownPlayerNumber, player.initData.serverClientInitData.playerNum));
                                    }
                                }
                            }
                        }

                        foreach (var player in players.Values)
                        {
                            player.packetBuilder.SendPacket(new ServerHealthUpdate(playerHit, players[playerHit].health, maxHealth));
                        }
                    }

                    players[clientSendShoot.ownPlayerNumber].transform.gameObject.SetActive(true);
                    break;
                
            }
        }

        IEnumerator RespawnRoutine(ServerClientData playerDead)
        {
            yield return new WaitForSecondsRealtime(respawnTime);
            Respawn(playerDead);
            foreach (var player in players.Values)
            {
                player.packetBuilder.SendPacket(new ClientRespawn(playerDead.initData.serverClientInitData.playerNum));
                player.packetBuilder.SendPacket(new ServerHealthUpdate(playerDead.initData.serverClientInitData.playerNum, playerDead.health, maxHealth));
            }
        }
    }


</div>
        </div>
        </li>
        <li style= "padding-bottom: 15px">
        <div style="display: flex; align-items: flex-start; gap: 20px; margin-bottom: 20px;">
    <div style="flex: 1; min-width: 0;">
        <span style="color:rgb(164, 208, 255); font-weight: bold;  font-size: 120%">Skins and Username</span>
                <p style="margin-bottom: 1.2rem;">
                    These class load the skin (using a model and material ID) and username of a player to the right component.
                </p>
    </div>
    <div style="flex-shrink: 0;">
        <img src="https://i.imgur.com/EaeTNWk.gif" alt="Network Diagram" 
             style="width: 600px; max-width: 150%; border: 1px solid #3d4450; border-radius: 4px;">
    </div>
</div>

<details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
    <summary style="cursor: pointer; padding: 8px; background-color: #2a2f3a; color: #fff; font-family: monospace;">
        ClientSkinLoader.cs and OtherClientUIManager.cs
    </summary>
    <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public class ClientSkinLoader : MonoBehaviour
    {
        [SerializeField] ClientGlobalInfo clientInfo;
        [SerializeField] Transform ancor;
        [SerializeField] ShootManager shoot;
        public void LoadSkin(int skinId, int matId)
        {
            GameObject obj = Instantiate(clientInfo.skinsPrefab[skinId], ancor);
            obj.transform.GetComponent<MeshRenderer>().material = clientInfo.materials[matId];
            if(shoot != null)
            {
                shoot.SetupShoot(obj.transform.GetComponent<ShootParticle>());
            }
        }
    }

    public class OtherClientUIManager : MonoBehaviour
    {
        [SerializeField] TextMeshProUGUI tmpName;
        [SerializeField] Scrollbar healthBar;
        [SerializeField] Canvas canvas;

        private void Start()
        {
            canvas.worldCamera = Camera.main;
        }

        public void LoadName(string name)
        {
            tmpName.text = name;
        }

        public void UpdateHealth(ushort health, ushort maxHealth)
        {
            healthBar.size = (float)health / (float)maxHealth;
        }
    }

</div>
        </div>
        </li>
        <li style= "padding-bottom: 15px">
                <span style="color:rgb(164, 208, 255); font-weight: bold; font-size: 120%">Data Serialization</span>
                <p>
                    I created a static class with functiun to serialize and deserialize types such as bytes, ushort, short, uint, int, float, Quaternions, Vectors and Color.
                </p>
                    <details style="margin: 10px 0; border: 1px solid #3d4450; border-radius: 4px;">
        <summary style="cursor: pointer; padding: 4px; background-color: #2a2f3a; color: #fff;">
            Serialization.cs
        </summary>
        <div style="background-color: #1a1a1a; border-radius: 0 0 4px 4px;">
<div>

    public static class Serialization
    {
        public static void SerializeColor(List<byte> byteArray, Color value)
        {
            SerializeU8(byteArray, (byte)(value.r));
            SerializeU8(byteArray, (byte)(value.g));
            SerializeU8(byteArray, (byte)(value.b));
            SerializeU8(byteArray, (byte)(value.a));
        }

        public static Color DeserializeColor(byte[] byteArray, ref int offset)
        {
            byte r = DeserializeU8(byteArray, ref offset);
            byte g = DeserializeU8(byteArray, ref offset);
            byte b = DeserializeU8(byteArray, ref offset);
            byte a = DeserializeU8(byteArray, ref offset);

            return new Color(r, g, b, a);
        }

        public static void SerializeVector3(List<byte> byteArray, Vector3 value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
            SerializeF32(byteArray, value.z);
        }

        public static Vector3 DeserializeVector3(byte[] byteArray, ref int offset)
        {
            Vector3 result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            result.z = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeVector2(List<byte> byteArray, Vector2 value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
        }

        public static Vector2 DeserializeVector2(byte[] byteArray, ref int offset)
        {
            Vector2 result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeQuaternion(List<byte> byteArray, Quaternion value)
        {
            SerializeF32(byteArray, value.x);
            SerializeF32(byteArray, value.y);
            SerializeF32(byteArray, value.z);
            SerializeF32(byteArray, value.w);
        }

        public static Quaternion DeserializeQuaternion(byte[] byteArray, ref int offset)
        {
            Quaternion result;
            result.x = DeserializeF32(byteArray, ref offset);
            result.y = DeserializeF32(byteArray, ref offset);
            result.z = DeserializeF32(byteArray, ref offset);
            result.w = DeserializeF32(byteArray, ref offset);
            return result;
        }

        public static void SerializeF32(List<byte> byteArray, float value)
        {
            int intRepresentation = BitConverter.ToInt32(BitConverter.GetBytes(value), 0);
            SerializeI32(byteArray, intRepresentation);
        }

        public static float DeserializeF32(byte[] byteArray, ref int offset)
        {
            int intRepresentation = DeserializeI32(byteArray, ref offset);
            return BitConverter.ToSingle(BitConverter.GetBytes(intRepresentation), 0);
        }

        public static void SerializeI8(List<byte> byteArray, sbyte value)
        {
            SerializeU8(byteArray, (byte)value);
        }

        public static sbyte DeserializeI8(byte[] byteArray, ref int offset)
        {
            return (sbyte)DeserializeU8(byteArray, ref offset);
        }

        public static void SerializeI16(List<byte> byteArray, short value)
        {
            SerializeU16(byteArray, (ushort)value);
        }

        public static short DeserializeI16(byte[] byteArray, ref int offset)
        {
            short value = BitConverter.ToInt16(byteArray, offset);
            offset += sizeof(short);
            return IPAddress.NetworkToHostOrder(value);
        }

        public static void SerializeI32(List<byte> byteArray, int value)
        {
            SerializeU32(byteArray, (uint)value);
        }

        public static int DeserializeI32(byte[] byteArray, ref int offset)
        {
            int value = BitConverter.ToInt32(byteArray, offset);
            offset += sizeof(int);
            return IPAddress.NetworkToHostOrder(value);
        }

        public static void SerializeU8(List<byte> byteArray, byte value)
        {
            byteArray.Add(value);
        }

        public static byte DeserializeU8(byte[] byteArray, ref int offset)
        {
            byte value = byteArray[offset];
            offset += sizeof(byte);
            return value;
        }

        public static void SerializeU16(List<byte> byteArray, ushort value)
        {
            value = (ushort)IPAddress.HostToNetworkOrder((short)value);
            byteArray.AddRange(BitConverter.GetBytes(value));
        }

        public static ushort DeserializeU16(byte[] byteArray, ref int offset)
        {
            ushort value = BitConverter.ToUInt16(byteArray, offset);
            offset += sizeof(ushort);
            return (ushort)IPAddress.NetworkToHostOrder((short)value);
        }

        public static void SerializeU32(List<byte> byteArray, uint value)
        {
            value = (uint)IPAddress.HostToNetworkOrder((int)value);
            byteArray.AddRange(BitConverter.GetBytes(value));
        }

        public static uint DeserializeU32(byte[] byteArray, ref int offset)
        {
            uint value = BitConverter.ToUInt32(byteArray, offset);
            offset += sizeof(uint);
            return (uint)IPAddress.NetworkToHostOrder((int)value);
        }

        public static void SerializeString(List<byte> byteArray, string value)
        {
            SerializeU32(byteArray, (uint)value.Length);
            byteArray.AddRange(Encoding.UTF8.GetBytes(value));
        }

        public static string DeserializeString(byte[] byteArray, ref int offset)
        {
            uint length = DeserializeU32(byteArray, ref offset);
            string value = Encoding.UTF8.GetString(byteArray, offset, (int)length);
            offset += (int)length;
            return value;
        }
    }

</div>
                </details>
            </li>
        </ul>
    </div>
</div>